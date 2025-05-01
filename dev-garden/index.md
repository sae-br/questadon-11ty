---
title: Dev Garden
layout: layout.njk
---

# Dev Garden

This is my public learning journal: a digital garden where I share what I’m making, learning, and thinking about along the way.

---

{% for post in collections.devGarden | reverse %}
  {% if post.url != '/dev-garden/' %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p>{{ post.data.description }}</p>
    </article>
  {% endif %}
{% endfor %}