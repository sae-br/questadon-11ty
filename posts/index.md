---
title: Updates | Questadon
layout: layout.njk
templateEngineOverride: njk
# The list uses the full width; the posts themselves stay in the reading column.
mainClass: ""
description: Thoughts, fun findings, and learning notes about programming, AI, TTRPGs, and more.
eleventyNavigation:
  key: Updates
  order: 3
---

<header class="page-head">
<p class="eyebrow">Updates</p>
<h1>From the studio</h1>
<p class="lede">Announcements and behind-the-scenes thoughts. I reserve the right to disagree with myself in the future. 🙃</p>
</header>

{% set postList = collections.posts %}{% set postTag = "h2" %}{% include "post-list.njk" %}
