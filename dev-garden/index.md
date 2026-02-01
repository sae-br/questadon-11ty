---
title: Dev Garden | Questadon
layout: layout.njk
description: A public learning journal sharing notes on web development, static site generators, and creative coding experiments.
eleventyNavigation:
  key: Dev Garden
  order: 3
---

# Dev Garden

This is my public learning journal: a digital garden where I share what I’m making, learning, and thinking about along the way.

---
 

{% for post in collections.devGarden %}
  {% if post.url != '/dev-garden/' %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p>{{ post.data.description }}</p>
      <p class="tiny">{{ post.date | readableDate }}</p>
    </article>
  {% endif %}
{% endfor %}