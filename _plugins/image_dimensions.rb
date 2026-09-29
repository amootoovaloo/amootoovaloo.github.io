# Adds width and height to every <img> that points into /images/ (unless it
# already has them), read from the image file itself. Browsers then reserve
# the right space before an image loads, so the page does not shift as
# images arrive, and links to sections land in the right place.
#
# Supports JPEG, PNG and WebP. Runs on every build; nothing to maintain.

module ImageDimensions
  CACHE = {}

  def self.size(path)
    CACHE[path] ||= begin
      data = File.binread(path, 64 * 1024)
      png(data) || webp(data) || jpeg(path)
    rescue StandardError
      nil
    end
  end

  def self.png(d)
    return unless d.start_with?("\x89PNG".b)
    d[16, 8].unpack("NN")
  end

  def self.webp(d)
    return unless d[0, 4] == "RIFF" && d[8, 4] == "WEBP"
    case d[12, 4]
    when "VP8 "
      w, h = d[26, 4].unpack("vv")
      [w & 0x3fff, h & 0x3fff]
    when "VP8L"
      b = d[21, 4].bytes
      [1 + (((b[1] & 0x3f) << 8) | b[0]),
       1 + (((b[3] & 0x0f) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6))]
    when "VP8X"
      w = d[24, 3].bytes; h = d[27, 3].bytes
      [1 + (w[0] | (w[1] << 8) | (w[2] << 16)), 1 + (h[0] | (h[1] << 8) | (h[2] << 16))]
    end
  end

  # Walk the JPEG markers to the first start-of-frame, which holds the size.
  def self.jpeg(path)
    File.open(path, "rb") do |f|
      return unless f.read(2) == "\xFF\xD8".b
      loop do
        marker = f.read(2)&.bytes or return
        return unless marker[0] == 0xFF
        length = f.read(2).unpack1("n")
        if (0xC0..0xCF).cover?(marker[1]) && ![0xC4, 0xC8, 0xCC].include?(marker[1])
          h, w = f.read(5).unpack("xnn")
          return [w, h]
        end
        f.seek(length - 2, IO::SEEK_CUR)
      end
    end
  end

  # Images without a size get the file's width and height. Images that set
  # their own display size (e.g. width="60%") keep it and get the file's
  # aspect ratio instead. Images with both a numeric width and height (such
  # as the square headshot) already define their shape and are left alone.
  def self.annotate(html, site_source)
    html.gsub(/<img\b[^>]*>/) do |tag|
      src = tag[/\ssrc="(\/images\/[^"?#]+)"/, 1] or next tag
      width  = tag[/\swidth\s*=\s*"([^"]*)"/, 1]
      height = tag[/\sheight\s*=\s*"([^"]*)"/, 1]
      next tag if width =~ /\A\d+\z/ && height =~ /\A\d+\z/
      dims = size(File.join(site_source, src)) or next tag
      if width.nil? && height.nil?
        tag.sub(/<img\b/, %(<img width="#{dims[0]}" height="#{dims[1]}"))
      elsif tag =~ /\sstyle\s*=\s*"/
        tag.sub(/(\sstyle\s*=\s*")/, %(\\1aspect-ratio: #{dims[0]} / #{dims[1]}; ))
      else
        tag.sub(/<img\b/, %(<img style="aspect-ratio: #{dims[0]} / #{dims[1]}"))
      end
    end
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |doc|
  next unless doc.output_ext == ".html" && doc.output
  doc.output = ImageDimensions.annotate(doc.output, doc.site.source)
end
