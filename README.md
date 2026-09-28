# amootoovaloo.github.io

Personal website of Arrykrishna Mootoovaloo, built with Jekyll 4 and deployed
to GitHub Pages by GitHub Actions (`.github/workflows/pages.yml`) on every push
to `master`.

## Preview locally

```sh
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

The local build uses the same Jekyll version as the deployed site.

## Where things live

- `_pages/`: site pages, grouped like the menu (About, Publications, Blog, More)
- `_posts/`: blog posts
- `_data/`: publications, talks, visits, papers, books and the menu
- `images/`: site assets, one folder per blog post, plus `travel/` and `luminaries/`
- `_scripts/`: helper scripts, such as `make_travel_map.py` for the Workshops & Visits map
