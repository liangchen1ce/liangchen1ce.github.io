---
title: Tags
layout: conteste
permalink: /eng/tags/
quote: Tags
---
<ul class="listing">
<div id='tag_cloud'>
{% for tag in site.tags %}
	{% assign flag = 0 %}
	{% for post in tag[1] %}
		{% for category in post.category %}
			{% if category contains 'eng' %}
				{% assign flag = flag | plus: 1 %}
		  	{% endif %}
		{% endfor %}
		{% for category in post.categories %}
			{% if category contains 'eng' %}
				{% assign flag = flag | plus: 1 %}
		  	{% endif %}
		{% endfor %}
	{% endfor %}

	{% if flag > 0 %}
		<a href="/tags/{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}">&nbsp;{{ tag[0] }}&nbsp;</a>
	{% endif %}
{% endfor %}
</div>
</ul>
<script src="/media/js/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="/media/js/jquery.tagcloud.js" type="text/javascript" charset="utf-8"></script> 
<script language="javascript">
	$(document).ready(function () {
	  $.fn.tagcloud.defaults = {
	    size: {start: 1, end: 1, unit: 'em'},
	      color: {start: '#CBD4E9', end: '#405179'}
	};

	$(function () {
	    $('#tag_cloud a').tagcloud();
	});
});

</script>