---
title: Projects
layout: conteste
permalink: /eng/projects/
---



<ul class="listing">

<li class="listing-seperator">{{ 'Singing Research' }}</li>
{% for post in site.categories.projects %}
{% if post.another-category == 'Singing Research'%}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
{% endif %}
{% endfor %}

<li class="listing-seperator">{{ 'Software' }}</li>
{% for post in site.categories.projects %}
{% if post.another-category == 'Software'%}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
{% endif %}
{% endfor %}
	
<li class="listing-seperator">{{ 'Laptop Orchestra Performance' }}</li>
{% for post in site.categories.projects %}
{% if post.another-category == 'Software'%}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
{% endif %}
{% endfor %}
	
<li class="listing-seperator">{{ 'Vocal Performance' }}</li>
{% for post in site.categories.projects %}
{% if post.another-category == 'Vocal Performance'%}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
{% endif %}
{% endfor %}

<li class="listing-seperator">{{ 'Mathematics' }}</li>
{% for post in site.categories.projects %}
{% if post.another-category == 'Mathematics'%}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
	</li>
{% endif %}
{% endfor %}

</ul>
