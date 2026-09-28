---
layout: page
title: Talks
lead: Talks and posters on his research, at universities, conferences and workshops.
permalink: /talks/
---

{% assign by_year = site.data.talks | group_by: "year" %}
{% for group in by_year %}
<h2 class="reading-list__heading" id="talks-{{ group.name }}">{{ group.name }}</h2>
<ul class="reading-list">
  {%- for talk in group.items %}
  <li class="reading-list__item">
    <span class="reading-list__title">{{ talk.title }}</span>
    <span class="reading-list__meta"><span class="tag{% if talk.kind == 'Poster' %} tag--poster{% endif %}">{{ talk.kind }}</span> {{ talk.host }} · {{ talk.place }}{% if talk.note %} ({{ talk.note }}){% endif %}{% for link in talk.links %} · <a href="{{ link.url }}">{{ link.label }}</a>{% endfor %}</span>
  </li>
  {%- endfor %}
</ul>
{% endfor %}
