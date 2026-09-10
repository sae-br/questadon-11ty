---
title: Nimble Rules Search - Fast, Free Rule Lookups Mid-Game
description: A free, searchable web tool for finding rules across the Nimble rulebooks mid-session, so you're not flipping through PDFs while everyone waits.
date: 2025-04-23
tags: [project, nimble, tool]
cardImage: ./assets/post-images/nimble-rules/cover.png
cardImageAlt: "Nimble Rules Search: a free tool for looking up Nimble rules mid-game"
cardImageFocus: center
lead: Nimble is new enough that there aren't many tools for it yet. So I threw this together for my own table in May 2025—type a word, get the rule, get back to the game. It's still up, and you're welcome to use it.
heroImage: ./assets/post-images/nimble-rules/banner.png
heroImageTall: ./assets/post-images/nimble-rules/cover.png
heroImageAlt: "Nimble Rules Search: a free tool for looking up Nimble rules mid-game"
ctaText: Open the Nimble Rules Search
ctaUrl: "https://nimble-rules.onrender.com/search"
ctaExternal: true
ctaNote: "Give it a bit to spin up, then use password: Hopscotch"
specs:
  - label: System
    value: Nimble
  - label: Price
    value: Free
  - label: Format
    value: Web app, any browser
  - label: Status
    value: A 2025 side project, still running
---
My long-running online group plays Nimble right now (as of May 2025), and because it's a newer system there just isn't the pile of wikis, cheat sheets, and lookup tools you get with something like D&D. We were all learning it at the same time, which meant every session we had a moment where somebody asked "wait, how does that work again?" and we'd all wait while someone scrolled through several PDFs trying to remember which one the answer was in.

So I made a thing that fixes that one specific annoyance, and have been using it for myself—figured I'd share if anyone else likes the idea! It's not fancy, but it works!

## What it does

You type a word or phrase. It searches across the Nimble rulebooks at once and shows you the matching passages, with the relevant bits highlighted and a note about which book and section each one came from.

- **Searches all the books together**, so you don't have to guess which PDF has your answer
- **Fuzzy matching**, so "advantag" or a typo mid-panic still finds the right rule
- **Highlights the match** in the surrounding text, so you get the context and not just a page number
- **Tells you where it came from**, so you can double-check it in your own copy of the book

It's built to do one thing quickly, and saves me time!

## How to use it at the table

1. Open it in a tab before session starts (see the note below about spin-up).
2. Enter the password when it asks: **Hopscotch**
3. Search single distinctive words rather than full questions—i.e.**"stagger"** works better than **"what happens when I get staggered"**.
4. If you get too many results, add a second word. If you get none, try a shorter or simpler one.

That last one is the main trick. It's keyword search, not a chatbot—it's looking for words that actually appear in the books, so it rewards short and specific over conversational.

## Fair warnings

**It goes to sleep.** It's on a free hosting plan, so if nobody's used it in a while the first visit takes something like 30-60 seconds to wake up. I open it at the beginning of a session so it's ready when the question comes.

**It's not AI.** It won't summarize a rule or reason about your weird edge case. It finds the text and shows it to you. 

**It's pointed at the PDFs I had in May 2025.** If Nimble has been updated since, this won't know about it. Treat what it finds as "go look at this section," not as the final word.

**It's shared, not polished.** There's no mobile-friendly design, no clear-search button, no account. It's the tool my group uses, left switched on in case it's useful to yours.

## Might do someday

If people actually use it, I might add a proper front-end that doesn't look like a Craigslist post, make an easier way to drop in updated rulebooks, and maybe improve it with a smarter search that handles a real question. 

> UPDATE (AUG 2026): If you play Nimble and you try this, I'd love to know whether it was useful, or what you'd want it to do instead. My regular group finished our Nimble campaign and we don't use this anymore but I'd improve it if someone does want it! Or if you've built something similar for your own table, please show me—I'm nosy about other people's game tools. ++ hello@questadon.com ++ @questadon
