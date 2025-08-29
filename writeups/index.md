---
layout: default
title: Writeups
---

# Writeups

<ul>
{% for post in site.writeups %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
