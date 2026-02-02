---
title: Digital Garden | Questadon
layout: layout.njk
description: Thoughts, fun findings, and learning notes about programming, AI, TTRPGs, and more.
eleventyNavigation:
  key: Digital Garden
  order: 3
---

# Digital Garden

<p class="lead">My haphazard digital garden of things I’m making, learning, finding, and thinking about along my learning journey. I reserve the right to disagree with myself in the future. 🙃</p>

---
 

{% for post in collections.digitalGarden %}
  {% if post.url != '/digital-garden/' %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
      <p>{{ post.data.description }}</p>
      <p class="tiny">{{ post.date | readableDate }}</p>
    </article>
  {% endif %}
{% endfor %}