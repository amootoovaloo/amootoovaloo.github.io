---
layout: page
title: More
lead: Teaching notes, reading lists and a few stories from along the way.
permalink: /more/
---

{% assign group = site.data.menu | where: "title", "More" | first %}
<div class="cards cards--links">
  {% for item in group.children %}
  <a class="card card--link" href="{{ item.href | prepend: site.baseurl }}">
    <h3>{{ item.title }}</h3>
    <p>{{ item.description }}</p>
  </a>
  {% endfor %}
</div>
