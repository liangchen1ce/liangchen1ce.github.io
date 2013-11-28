---
title: Projects
layout: conteste
permalink: /eng/projects/
---



<ul class="listing">
{% for post in site.categories.projects %}

  <li class="listing-seperator">{{ post.another-category }}</li>

  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
{% endfor %}
</ul>
