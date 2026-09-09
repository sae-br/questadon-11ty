---
title: Games & More | Questadon
layout: layout.njk
description: Table-top roleplaying games, D&D content, and other tools and stuff.
eleventyNavigation:
  key: Games & More
  order: 2
---

# Games & More

<div class="project-grid project-grid--index">
{%- for project in collections.projects %}
{%- if project.url != '/projects/' %}
<a class="project-card" href="{{ project.url }}">
{%- if project.data.cardImage %}
<div class="project-card__media" style="--card-focus: {{ project.data.cardImageFocus | default('center') }}">{% image project.data.cardImage, project.data.cardImageAlt or project.data.title, "(max-width: 540px) 100vw, 440px" %}</div>
{%- endif %}
<h2 class="project-card__title">{{ project.data.title }}</h2>
<p class="project-card__blurb">{{ project.data.description }}</p>
</a>
{%- endif %}
{%- endfor %}
</div>
