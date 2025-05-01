---
title: Projects
layout: layout.njk
---

# Projects

Here’s a growing collection of creative and technical projects I’m experimenting with.

---

{% for post in collections.projects | reverse %}
  {% if post.url != '/projects/' %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p>{{ post.data.description }}</p>
    </article>
  {% endif %}
{% endfor %}