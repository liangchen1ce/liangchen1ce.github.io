---
layout: contest
title: Liang Chen&#62;Chinese Blog
name: Chinese Blog
permalink: /cn/
---


<ul class="listing">
{% for post in site.categories.cn %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator">{{ y }}</li>
  {% endif %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="/cn/{{post.linka}}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
