---
title: Projects | Questadon
layout: layout.njk
description: A collection of creative and technical projects—from Python tools to TTRPG utilities and web experiments.
eleventyNavigation:
  key: Projects
  order: 2
---

# Projects

<p class="lead">Here’s a growing collection of creative and technical projects I’m experimenting with.</p>

---
 

{% for post in collections.projects %}
  {% if post.url != '/projects/' %}
<article class="post-preview">
<h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
<p>{{ post.data.description }}</p>
<p class="post-meta"><span class="post-date">{{ post.date | readableDate }}</span>{% if post.data.tags %}{% for tag in post.data.tags %}{% if tag != "project" %} <a href="/tags/{{ tag | slugify }}/" class="tag-pill">{{ tag }}</a>{% endif %}{% endfor %}{% endif %}</p>
</article>
  {% endif %}
{% endfor %}