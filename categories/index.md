---
layout: default
title: Categories
---

# Categories

{% assign categories = site.writeups | map: 'categories' | join: ',' | split: ',' | uniq | sort %}
{% for category in categories %}
## [{{ category | capitalize }}]({{ category | downcase }})
<ul>
{% for post in site.writeups | where_exp: 'doc', 'doc.categories contains category' %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
{% endfor %}
