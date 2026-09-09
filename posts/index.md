---
title: Updates | Questadon
layout: layout.njk
description: Thoughts, fun findings, and learning notes about programming, AI, TTRPGs, and more.
eleventyNavigation:
  key: Updates
  order: 3
---

# Updates

<p class="lead">Announcements and behind-the-scenes thoughts. I reserve the right to disagree with myself in the future. 🙃</p>

---
 

{% for post in collections.posts %}
  {% if post.url != '/posts/' %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p>{{ post.data.description }}</p>
      <p class="tiny">{{ post.date | readableDate }}</p>
    </article>
  {% endif %}
{% endfor %}
