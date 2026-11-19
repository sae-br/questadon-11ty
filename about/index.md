---
title: About | Questadon
layout: layout.njk
templateEngineOverride: njk
description: Questadon is a tabletop role-playing game studio created by Sarah Brown, designer of the horror-survival RPG Final Light. Play games that make you feel things.
eleventyNavigation:
  key: About
  order: 4
---
{# The studio first, then its founder. HTML only (no Markdown) so the layout
   classes stay exactly as written. #}

<header class="page-head">
  <p class="eyebrow">About</p>
  <h1>Questadon: here to help humans play.</h1>
  <p class="lede">Questadon is a tabletop role-playing game studio created by Sarah Brown, a 90s-brand nerd from Southern Ontario, Canada.</p>
</header>

<section class="studio" aria-labelledby="studio-title">
  <img class="studio__mark" src="/assets/questadon26-colour.svg" alt="" width="680" height="694">
  <div>
    <h2 class="visually-hidden" id="studio-title">The studio</h2>
    <p class="about-statement">Because playing is good for you.</p>
    <p>Questadon makes cinematic, collaborative, occasionally chaotic games for people who like to laugh, cry, argue, and make dumb decisions in make-believe scenarios. Founded in 2026 near Waterloo, Canada, Questadon is a tiny TTRPG studio with a focus on keeping humans connected through imagination and play. </p>
  </div>
</section>

<section class="section founder" aria-labelledby="founder-title">
  <figure class="founder__photo">
    {% artImage "./assets/about/sarah-brown-questadon-founder.jpg", "Sarah Brown, founder of Questadon, in a black-and-white portrait", "(max-width: 760px) 340px, 460px" %}
  </figure>
  <div>
    <p class="eyebrow">The founder</p>
    <h2 id="founder-title">Sarah Brown</h2>
    <p class="lede">Hi, I’m Sarah. I play, run, and design TTRPGs, because I like to make my friends laugh and cry. (And you and your friends, too, if you’re into that kind of thing.)</p>
    <p>My first published game, <em>Final Light</em>, is a short-form horror-survival zombie RPG with a focus on intense escape, limited inventory, and personal stakes. It was funded on Kickstarter within the first minute! You can <a href="/projects/final-light-ttrpg/">find out more about Final Light</a>, including how to try it for free.</p>
    <p>One of my favourite things about this community is how generous and creative folks are. I’ve learned a ton from other creators, and hope to pay it forward! If you’re making TTRPG content too—or just want to trade ideas—I’d love to hear from you.</p>
    <div class="founder__links">
      <a class="link-arrow" href="https://www.instagram.com/questadon" rel="me">Say hi on Instagram <span aria-hidden="true">→</span></a>
      <a class="link-arrow" href="/#newsletter">Join the email list <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>
