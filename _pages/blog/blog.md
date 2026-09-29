---
layout: page
title: Blog
lead: Writing on research, mathematics, machine learning and statistics.
permalink: /blog/
---

{% capture chips %}{% assign cats = site.categories | sort %}{% for cat in cats %}<button class="filter-chip" type="button" data-filter-chip="{{ cat[0] | slugify }}" aria-pressed="false">{{ cat[0] }}</button>{% endfor %}{% endcapture %}
{% include filter-bar.html label="Search posts" placeholder="Search posts…" noun="posts" chips=chips %}

<ul class="post-list">
{% for post in site.posts %}
  {% capture y %}{{ post.date | date: "%Y" }}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="post-list__year" data-filter-divider>{{ y }}</li>
  {% endif %}
  {% include post-item.html post=post date_format="%-d %b" %}
{% endfor %}
</ul>

