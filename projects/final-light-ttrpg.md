---
title: Final Light - A Zombie Survival Story TTRPG
description: A survival-horror TTRPG for telling short, high-stakes zombie stories like The Last of Us, Train to Busan, 28 Days Later, and more.
date: 2026-08-31
tags: [project, ttrpg, full-game]
# Product page: the reusable product layout (_includes/product-page.njk), and
# the body below is HTML run through Nunjucks only - no Markdown - so the
# typography stays exactly as written. Products, FAQ, adventures and spreads
# live in _data/finalLight.js.
layout: product-page.njk
templateEngineOverride: njk
ogType: website
cardImage: ./assets/post-images/final-light/final-light-books.jpg
cardImageAlt: "The Final Light core book and adventure guides"
cardImageFocus: center
heading: Final Light
subtitle: A zombie survival story TTRPG
lead: Scavenge, stealth, and escape your way through a world of undead, and hold on to whatever keeps you human.
# The game's own colour (the red from the book art), not the site's brand
# pink/green. accentLight is the same red, darkened for the light theme.
accent: "#e2463c"
accentLight: "#b3261e"
# Header art, and the social share image (the Core Book with Agis's quote).
heroImage: ./assets/post-images/final-light/final-light-hero-infected.jpg
heroImageAlt: "An infected survivor lunges out of the dark beside the Final Light logo"
# Share image: the same art at 1200px wide (~130 KB instead of 1.5 MB).
image: /assets/social/final-light-share.jpg
imageWidth: 1200
imageHeight: 718
imageAlt: "Final Light Core Book cover beside the quote “The tensest RPG I’ve ever run.”"
ctaText: Get the game
ctaUrl: "#get-final-light"
ctaSecondaryText: Get the Quick Start
ctaSecondaryUrl: "#quick-start"
facts:
  - label: Players
    value: 2–4 players + GM
  - label: Length
    value: 3–5 sessions per adventure
  - label: Format
    value: Hardback & PDF
  - label: Pages
    value: "113"
toc:
  - { id: how-it-plays, label: How it plays }
  - { id: watch-it-played, label: Watch it played }
  - { id: inside-the-book, label: Inside the Core Book }
  - { id: the-adventures, label: The adventures }
  - { id: get-final-light, label: Get Final Light }
  - { id: quick-start, label: Download the Quick Start }
  - { id: faq, label: FAQ }
---
{# ---------- Pitch ---------- #}
<section class="product-section product-intro">
  <p class="product-intro__lead"><em>Final Light</em> is a short-form survival-horror RPG set after the world has fallen apart. <strong>You are not heroes trying to fix it. You are survivors trying to get through it.</strong></p>

  <p>This is not a game about mowing down enemies or levelling up. It’s a game where tables lean into the humanity of horror, reaching for the will to survive, and wondering who will make it to the end of the story together.</p>

  <p class="product-callout"><strong>The zombie TTRPG for fans of</strong> <em>The Last of Us</em>, <em>28 Days Later</em>, <em>Train to Busan</em>, <em>The Walking Dead</em>, and more.</p>

  <p class="product-note"><em>Funded in 2026 on Kickstarter by 264 backers at 4436% of goal.</em></p>
</section>

{# ---------- Quotes ---------- #}
<section class="product-section product-quotes" aria-label="What players say">
  {# The headline quote is set into the art, so the alt text carries it. #}
  <figure class="product-art">
    {% artImage "./assets/post-images/final-light/final-light-core-book-quote.jpg", "“The tensest RPG I’ve ever run.” —Agis, beside the Final Light Core Book cover" %}
  </figure>

  <div class="product-quotes__list">
    <figure class="pull-quote">
      <blockquote><p>“We made it out but I had been bitten. My character was getting ready to, you know, end it… so emotional! Somehow everyone else convinced me to amputate and keep trying. I actually bawled my eyes out.”</p></blockquote>
      <figcaption>—Peter</figcaption>
    </figure>
    <figure class="pull-quote">
      <blockquote><p>“My favourite part of TTRPGs is getting to sneak around. Final Light is an entire game system built around just that.”</p></blockquote>
      <figcaption>—Jon</figcaption>
    </figure>
    <figure class="pull-quote">
      <blockquote><p>“Felt like I was playing as a character in <em>The Last of Us</em> where the threat of each zombie bite was terrifying on its own.”</p></blockquote>
      <figcaption>—Phil</figcaption>
    </figure>
  </div>
</section>

{# ---------- Setting ---------- #}
<section class="product-section product-story">
  <p class="product-story__open">The world ends in darkness.</p>

  <p>Six years ago, five billion people became something no longer human. Millions more are dead. The blood-borne pathogen was only kept from completely eradicating humanity by the Blackout, a globally coordinated destruction of cities, infrastructure, and data centres. It was just enough to give us a chance.</p>

  <p class="product-story__beat">But survival is still far from guaranteed.</p>

  <p>Some nights, you stare at the stars and contemplate the length of darkness a person would need to travel through to get to the light. Is it worth it?</p>

  <p class="product-story__turn"><strong>This is a story about how you answer that question.</strong></p>

  {% set spread = finalLight.spreads.opener %}{% include "product-spread.njk" %}
</section>

{# ---------- How it plays ---------- #}
<section class="product-section">
  <h2 id="how-it-plays">How it plays</h2>

  <p>Every adventure drops you into a situation already in motion. Your characters are pushed into action by necessity—on a mission that has to be seen through. How it ends, only your table finds out.</p>

  <ol class="product-steps">
    <li><strong>Scavenge.</strong> Strip ruined locations for anything you can still use.</li>
    <li><strong>Craft.</strong> Turn what you find into gear that might keep you alive.</li>
    <li><strong>Push forward.</strong> Into encounters where stealth is your lifeline.</li>
    <li><strong>Get out alive.</strong> The goal is never to clear the room.</li>
  </ol>

  <p class="product-feature"><strong>Yesterday’s trash, today’s lifeline.</strong> It’s a DIY world out there. One throw of five dice tells you everything—what you found, and what you can make. Your choice about what to put in your backpack could save or haunt you.</p>

  {% set spread = finalLight.spreads.scavenging %}{% include "product-spread.njk" %}

  <p class="product-feature"><strong>Hidden → Hunted.</strong> When stealth breaks, the encounter flips—and everything escalates. Noise = zombies. The infected don’t roll to hit. If they reach you, you’re in trouble.</p>

  {% set spread = finalLight.spreads.encounters %}{% include "product-spread.njk" %}

  <figure class="pull-quote">
    <blockquote><p>“At the first sign of danger we started shooting, but the horde just kept coming. I managed to find a flamethrower with some scavenging—but we were already too far gone. We didn’t make it out alive... Already thinking about how I’d love to play it again.”</p></blockquote>
    <figcaption>—Owen</figcaption>
  </figure>

    <p class="product-feature"><strong>Personal Stakes: messy humans with secret mechanics.</strong> Every survivor carries a burden or challenge, each with its own mechanics to drive roleplay at the table. Surviving the dead is the “easy” part. Surviving each other is where it gets interesting.</p>

  {% set spread = finalLight.spreads.stakes %}{% include "product-spread.njk" %}

  <figure class="pull-quote">
    <blockquote><p>“The Personal Stakes piece is so cool. It gives you permission to lean into the chaos, and I just kept trying to figure out WHAT was going on with everyone else!”</p></blockquote>
    <figcaption>—Meg</figcaption>
  </figure>

  <p class="product-feature"><strong>Hold on to the Light.</strong> Staying alive is hard. Finding a reason to stay alive matters just as much. When something in play gives a character hope, they gain Light—a resource spent in desperate moments to try to turn the tide. But sometimes even hope runs dry. Sometimes good people die, or get bitten—and difficult choices have to be made about what comes next.</p>

  <figure class="pull-quote">
    <blockquote><p>“In a pyrrhic ending, our double-barrelled shotgun proved to be a grim but necessary finality for my father and I before we turned. May the other survivors forever celebrate our sacrifice!”</p></blockquote>
    <figcaption>—David</figcaption>
  </figure>

  <p class="product-feature"><strong>P.S.—the GM gets to be a player, too.</strong> GMs fill their own sheet, carry their own secrets, and risk the same sudden, violent death as everyone else.</p>
</section>

{# ---------- Watch it played ---------- #}
<section class="product-section">
  <h2 id="watch-it-played">Watch it played</h2>

  <p class="product-feature"><strong>Local Anaesthetic</strong> A drugstore nearby was picked over from the front, but the pharmacy in the back was never reached. Get in. Get the medicine. Get back home in one piece. Easy enough, right?</p>

  {# TODO(sarah): set finalLight.video.youtubeId in _data/finalLight.js and the
     embed below appears. Privacy-enhanced (youtube-nocookie) and lazy-loaded. #}
  {% if finalLight.video.youtubeId %}
  <div class="product-video">
    <iframe src="https://www.youtube-nocookie.com/embed/{{ finalLight.video.youtubeId }}" title="{{ finalLight.video.title }}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
  {% endif %}
</section>

{# ---------- Inside the Core Book ---------- #}
<section class="product-section">
  <h2 id="inside-the-book">Inside the Core Book</h2>

  <p>Everything you need to play a complete adventure as a table of one game master plus two to four players.</p>

  <ul class="product-list">
    <li><strong>The complete rule set.</strong> Fast to learn, built for tension.</li>
    <li><strong>Personal Stakes.</strong> 16 secret character burdens with their own mechanics.</li>
    <li><strong>Epic Items Compendium.</strong> 50 tools and weapons worth fighting over.</li>
    {# TODO(sarah): Evolved count for the bestiary line, if you want a number. #}
    <li><strong>Game Master Guide.</strong> Running an adventure, writing your own, and creating your own maps, Evolved, and Epic Items.</li>
    <li><strong>A full single-session mini-adventure</strong> to learn the game.</li>
  </ul>
</section>

{# ---------- The adventures ---------- #}
<section class="product-section">
  <h2 id="the-adventures">The adventures</h2>

  <p class="product-feature"><strong>The apocalypse comes to places you know.</strong> Every adventure is set in a real place, reimagined after the fall—the movie-apocalypse fantasy of “what would it be like here?” 3–5 sessions each, ready to run.</p>

  <figure class="product-art">
    {% artImage "./assets/post-images/final-light/final-light-adventures.jpg", "The four Final Light adventure guides: Terminal Departure, No Place Like Home, Maid of the Mist and The Walls Around Us. Four official adventures in real-world locations, available as PDFs and zines." %}
  </figure>

  <div class="product-cards">
    {% for adventure in finalLight.adventures %}
    <article class="product-card">
      {% if adventure.cover %}
      <div class="product-card__media">{% image adventure.cover, adventure.title + " cover", "(max-width: 640px) 100vw, 360px" %}</div>
      {% endif %}
      <h3 class="product-card__title">{{ adventure.title }}</h3>
      <p class="product-card__kicker">{{ adventure.place }}</p>
      <p class="product-card__text">{{ adventure.blurb }}</p>
    </article>
    {% endfor %}
  </div>
</section>

{# ---------- Get Final Light ---------- #}
<section class="product-section">
  <h2 id="get-final-light">Get Final Light</h2>

  <figure class="pull-quote">
    <blockquote><p>“Gloriously tense, wonderfully unpredictable and suffused with the kind of attention to detail that lets your role-playing flourish. I can’t wait to play again!”</p></blockquote>
    <figcaption>—Alec</figcaption>
  </figure>

  {# Rows come from finalLight.products. A product with no price reads "Coming
     soon"; one with a url links its name there. Below 640px each row becomes a
     card, labelled from each cell's data-label. #}
  <table class="product-buy">
    <thead>
      <tr>
        <th scope="col" class="product-buy__name">Product</th>
        <th scope="col">What you get</th>
        <th scope="col" class="product-buy__price">Price</th>
      </tr>
    </thead>
    <tbody>
      {% for product in finalLight.products %}
      <tr>
        <th scope="row" class="product-buy__name">{% if product.url %}<a href="{{ product.url }}">{{ product.name }}</a>{% else %}{{ product.name }}{% endif %}</th>
        <td data-label="What you get">{{ product.html | safe }}</td>
        <td data-label="Price" class="product-buy__price">{% if product.price %}{{ product.price }}{% else %}<span class="product-buy__soon">Coming soon</span>{% endif %}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>

  {# Release notifications: tags signups "Final Light Notify Release" in
     EmailOctopus (see _includes/release-signup.njk), so the launch email can
     go to exactly these people. #}
  <div class="product-notify">
    <h3 class="product-notify__title">Get notified when Final Light goes on sale</h3>
    <p class="product-notify__text">The Core Book and adventures aren’t for sale just yet. Leave your email and I’ll let you know as soon as they are.</p>
    {% include "release-signup.njk" %}
    <p class="product-notify__fine">You’ll also join the Questadon email list for occasional updates. Unsubscribe anytime.</p>
  </div>
</section>

{# ---------- Quick Start ---------- #}
<section class="product-section product-signup">
  <h2 id="quick-start">Download the Quick Start</h2>

  <p>The learn-to-play single-session quick start, <em>Local Anaesthetic</em>, is a way to learn the core pieces of the game and an option for tables that want to give the game a try.</p>

  {% include "final-light-signup.njk" %}
</section>

{# ---------- FAQ ---------- #}
<section class="product-section">
  <h2 id="faq">FAQ</h2>

  <div class="product-faq">
    {% for item in finalLight.faq %}
    <details class="product-faq__item">
      <summary>{{ item.question }}</summary>
      <p>{{ item.answerHtml | safe }}</p>
    </details>
    {% endfor %}
  </div>
</section>

{# ---------- Closing ---------- #}
{# TODO(sarah): press / review-copy contact line, once you have one. #}
<section class="product-section product-closing">
  <div>
    <p><strong>Join the Discord.</strong> Find other people who are excited about <em>Final Light</em>, get updates, and share stories from your table.</p>
    <p><a href="/r/discord-fl/">Questadon Discord</a></p>
  </div>
  <div>
    <p><strong>100% human-made.</strong> Every page, every word, every sketch, designed by real people (not zombies). No A.I. generated content anywhere in the book.</p>
  </div>
</section>

<script type="application/ld+json">{{ finalLight.jsonLd | dump | safe }}</script>
