---
layout: default
title: Writeups
---

# Writeups

{% assign groups = site.writeups | group_by: 'platform' %}
{% for group in groups %}
## {{ group.name }}
<ul>
{% for post in group.items %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
{% endfor %}
