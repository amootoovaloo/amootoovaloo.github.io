"""Generate _includes/travel-map.html, the map on the Workshops & Visits page.

An inline SVG of Africa and Europe (with a United States inset), drawn from
Natural Earth 1:50m country outlines (the world-atlas TopoJSON). Countries in
VISITED are highlighted, and each gets a marker linking to its section.

To add a country: add it to VISITED (its ISO 3166 numeric id, the section id
on the page, a label, a marker position and the places visited), then run

    python3 _scripts/make_travel_map.py

from anywhere. It needs only the Python standard library; the map data is
downloaded once and cached in the system temporary directory.
"""
import json, math, pathlib, tempfile, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "_includes" / "travel-map.html"
DATA_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"
SRC = pathlib.Path(tempfile.gettempdir()) / "world-atlas-countries-50m.json"
if not SRC.exists():
    urllib.request.urlretrieve(DATA_URL, SRC)

LON0, LON1, LAT0, LAT1 = -19.0, 63.5, -36.5, 60.5   # visible extent
PHI = math.radians(30)                              # equirectangular standard parallel
WIDTH = 400.0
K = WIDTH / ((LON1 - LON0) * math.cos(PHI))
HEIGHT = (LAT1 - LAT0) * K
TOL = 0.75                                          # simplification tolerance (px)

# Countries on the Travel page: ISO numeric id -> (section id, label, marker lon/lat, places)
VISITED = {
    "710": ("south-africa", "South Africa", (19.0, -33.0), "Cape Town and the Western Cape"),
    "508": ("mozambique", "Mozambique", (35.3, -18.0), "JEDI workshop, 2016"),
    "480": ("mauritius", "Mauritius", (57.55, -20.25), "Mauritius"),
    "276": ("germany", "Germany", (10.4, 50.8), "Lindau"),
    "756": ("switzerland", "Switzerland", (8.2, 46.8), "Geneva, Martigny and Zurich"),
    "826": ("united-kingdom", "United Kingdom", (-1.6, 52.6), "London"),
    "300": ("greece", "Greece", (24.0, 35.4), "Chania, Crete"),
    "724": ("spain", "Spain", (-0.4, 39.5), "Valencia"),
    "250": ("france", "France", (2.6, 46.6), "Les Houches"),
    "191": ("croatia", "Croatia", (13.6, 45.2), "LSST@Europe5, Poreč"),
}

# The United States is drawn as an inset in the empty Atlantic, bottom left.
US_ID = "840"
US_LON0, US_LON1, US_LAT0, US_LAT1 = -125.5, -66.0, 23.5, 50.0
INSET = (8.0, 392.0, 132.0)                        # x, y, width of the inset (px)
US_PLACES = [((-87.63, 41.88), "Chicago"), ((-74.0, 40.71), "New York")]

topo = json.loads(SRC.read_text())
sx, sy = topo["transform"]["scale"]
tx, ty = topo["transform"]["translate"]

def decode(arc):
    x = y = 0
    pts = []
    for dx, dy in arc:
        x += dx; y += dy
        pts.append((x * sx + tx, y * sy + ty))
    return pts

arcs = [decode(a) for a in topo["arcs"]]

def arc_pts(i):
    return arcs[i] if i >= 0 else arcs[~i][::-1]

def ring(idx):
    pts = []
    for i in idx:
        p = arc_pts(i)
        pts.extend(p if not pts else p[1:])
    return pts

def project(lon, lat):
    return ((lon - LON0) * math.cos(PHI) * K, (LAT1 - lat) * K)

def simplify(pts, tol):
    if len(pts) < 4:
        return pts
    def dp(a, b):
        (x1, y1), (x2, y2) = pts[a], pts[b]
        dx, dy = x2 - x1, y2 - y1
        n = math.hypot(dx, dy) or 1e-9
        best, bi = 0, None
        for i in range(a + 1, b):
            x0, y0 = pts[i]
            d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / n
            if d > best:
                best, bi = d, i
        if best > tol and bi is not None:
            return dp(a, bi)[:-1] + dp(bi, b)
        return [pts[a], pts[b]]
    mid = len(pts) // 2
    return dp(0, mid)[:-1] + dp(mid, len(pts) - 1)

def ring_path(r):
    lons = [p[0] for p in r]; lats = [p[1] for p in r]
    if max(lons) < LON0 - 2 or min(lons) > LON1 + 2 or max(lats) < LAT0 - 2 or min(lats) > LAT1 + 2:
        return ""
    if min(lons) < -60 and max(lons) > 100:
        return ""                                   # wraps the globe; not needed here
    # Clamp far-away points just outside the view so large countries are cut cleanly.
    r = [(min(max(lon, LON0 - 8), LON1 + 8), min(max(lat, LAT0 - 8), LAT1 + 8)) for lon, lat in r]
    pts = simplify([project(*p) for p in r], TOL)
    if len(pts) < 3:
        return ""
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    if max(xs) - min(xs) < 1.2 and max(ys) - min(ys) < 1.2:
        return ""                                   # too small to see
    return "M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + "Z"

def geom_path(g):
    polys = g["arcs"] if g["type"] == "MultiPolygon" else [g["arcs"]]
    return "".join(ring_path(ring(r)) for poly in polys for r in poly)

land, visited = [], {}
for g in topo["objects"]["countries"]["geometries"]:
    if g["type"] not in ("Polygon", "MultiPolygon"):
        continue
    d = geom_path(g)
    if not d:
        continue
    if g.get("id") in VISITED:
        visited[g["id"]] = d
    else:
        land.append(d)

# Inset: the lower 48 states with Canada and Mexico for context.
US_PHI = math.radians(37.5)
IX, IY, IW = INSET
IK = IW / ((US_LON1 - US_LON0) * math.cos(US_PHI))
IH = (US_LAT1 - US_LAT0) * IK

def project_us(lon, lat):
    return (IX + (lon - US_LON0) * math.cos(US_PHI) * IK, IY + (US_LAT1 - lat) * IK)

def inset_path(g):
    polys = g["arcs"] if g["type"] == "MultiPolygon" else [g["arcs"]]
    out = ""
    for poly in polys:
        for idx in poly:
            r = ring(idx)
            lons = [q[0] for q in r]; lats = [q[1] for q in r]
            if max(lons) < US_LON0 or min(lons) > US_LON1 or max(lats) < US_LAT0 or min(lats) > US_LAT1:
                continue
            r = [(min(max(lon, US_LON0 - 3), US_LON1 + 3), min(max(lat, US_LAT0 - 3), US_LAT1 + 3)) for lon, lat in r]
            pts = simplify([project_us(*q) for q in r], 0.3)
            if len(pts) >= 3:
                out += "M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + "Z"
    return out

us_path, us_context = "", []
for g in topo["objects"]["countries"]["geometries"]:
    if g.get("id") == US_ID:
        us_path = inset_path(g)
    elif g.get("id") in ("124", "484"):
        us_context.append(inset_path(g))
assert us_path

missing = set(VISITED) - set(visited)
assert not missing, missing

lines = [
    '{%- comment -%}Generated by _scripts/make_travel_map.py; edit that script, not this file.',
    'Map of Africa and Europe, with a United States inset (Natural Earth 1:50m via world-atlas).',
    'Countries on the Workshops & Visits page are highlighted; each marker links to its section.{%- endcomment -%}',
    f'<figure class="travel-map">',
    f'<svg viewBox="0 0 {WIDTH:.0f} {HEIGHT:.0f}" role="group" aria-labelledby="travel-map-title">',
    '<title id="travel-map-title">Map of the countries described on this page</title>',
    # Fade the land out where the map crops it (top and right edges).
    '<defs>'
    '<linearGradient id="travel-map-fx" x2="1" y2="0"><stop offset=".8" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>'
    '<linearGradient id="travel-map-fy" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".07" stop-color="#fff"/></linearGradient>'
    f'<mask id="travel-map-mx"><rect width="{WIDTH:.0f}" height="{HEIGHT:.0f}" fill="url(#travel-map-fx)"/></mask>'
    f'<mask id="travel-map-my"><rect width="{WIDTH:.0f}" height="{HEIGHT:.0f}" fill="url(#travel-map-fy)"/></mask>'
    f'<clipPath id="travel-map-inset"><rect x="{IX:.1f}" y="{IY:.1f}" width="{IW:.1f}" height="{IH:.1f}" rx="6"/></clipPath>'
    '</defs>',
    f'<g mask="url(#travel-map-my)"><g mask="url(#travel-map-mx)"><path class="travel-map__land" d="{"".join(land)}"/></g></g>',
]
for cid, (sec, label, (lon, lat), places) in VISITED.items():
    x, y = project(lon, lat)
    lines.append(
        f'<a class="travel-map__place" href="#{sec}" aria-label="{label}: {places}">'
        f'<title>{label}: {places}</title>'
        f'<path class="travel-map__country" d="{visited[cid]}"/>'
        f'<circle class="travel-map__halo" cx="{x:.1f}" cy="{y:.1f}" r="9"/>'
        f'<circle class="travel-map__dot" cx="{x:.1f}" cy="{y:.1f}" r="4"/>'
        f'</a>'
    )
ux, uy = zip(*(project_us(*ll) for ll, _ in US_PLACES))
lines += [
    f'<rect class="travel-map__inset" x="{IX:.1f}" y="{IY:.1f}" width="{IW:.1f}" height="{IH:.1f}" rx="6"/>',
    f'<g clip-path="url(#travel-map-inset)"><path class="travel-map__land" d="{"".join(us_context)}"/></g>',
    '<a class="travel-map__place" href="#united-states" aria-label="United States: Chicago and New York">'
    '<title>United States: Chicago and New York</title>'
    f'<g clip-path="url(#travel-map-inset)"><path class="travel-map__country" d="{us_path}"/></g>'
    + "".join(f'<circle class="travel-map__halo" cx="{x:.1f}" cy="{y:.1f}" r="7"/><circle class="travel-map__dot" cx="{x:.1f}" cy="{y:.1f}" r="3.2"/>' for x, y in zip(ux, uy))
    + '</a>',
    f'<text class="travel-map__label" x="{IX + 6:.1f}" y="{IY + IH + 11:.1f}">United States</text>',
]
lines += ['</svg>', '<figcaption>Select a country to jump to its section.</figcaption>', '</figure>', '']
OUT.write_text("\n".join(lines))
print(f"{OUT.name}: {OUT.stat().st_size/1024:.1f} KB, viewBox 0 0 {WIDTH:.0f} {HEIGHT:.0f}, {len(land)} other countries")
