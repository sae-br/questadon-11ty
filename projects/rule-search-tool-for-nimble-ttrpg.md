---
title: Rule Reference Tool for Nimble TTRPG
description: A lightweight, self-hosted tool for querying multiple Nimble rulebook PDFs, built with Python + Flask to make searching rules in-game easy and free.
date: 2025-04-23
tags: [project, nimble, tool]
cardImage: ./assets/post-images/nimble-rules/cover.png
cardImageAlt: "Rule Reference Tool for Nimble TTRPG"
cardImageFocus: center
lead: A hosted, searchable web app for querying multiple Nimble rulebook PDFs—fast keyword and fuzzy search, with citation links back to the source section.
heroImage: ./assets/post-images/nimble-rules/banner.png
heroImageAlt: "Rule Reference Tool for Nimble TTRPG"
ctaText: Open the Nimble Rules Search
ctaUrl: "https://nimble-rules.onrender.com/search"
ctaExternal: true
ctaNote: "Give it a bit to spin up, then use password: Hopscotch"
ctaSecondaryText: View the code on GitHub
ctaSecondaryUrl: "https://github.com/sae-br/nimble-rules"
ctaSecondaryExternal: true
specs:
  - label: System
    value: Nimble
  - label: Price
    value: Free
  - label: Built with
    value: Python + Flask
  - label: Hosting
    value: Render (free tier, sleeps when idle)
---
## The Final (for now) Result

I built a **hosted searchable web app** that uses Python and Flask to:
- Ingest and chunk PDFs
- Run fast keyword and fuzzy searches
- Display results in an easy-to-read web UI
- Highlight relevant matches
- Provide citation-style links back to the original PDF section

It's a **deliberately simple and fast** tool. I wanted something my group could use on the fly during sessions, with no money down.

Hosted on Render: [Nimble Rules Search](https://nimble-rules.onrender.com/search)

Give it a bit to spin up! Then use password: Hopscotch

Poke through my build here, too, if you'd like: [Nimble Rules - GitHub](https://github.com/sae-br/nimble-rules)


## What I Set Out to Build

So with my long-running online TTRPG group, we play using a game system that's pretty new called Nimble. Unlike other tabletop roleplaying games like Dungeons and Dragons, there aren't many tools or references made for this one. Since we are all learning the system together, I wanted an easy way to **look up specific rules from the Nimble rules PDFs during gameplay**—without constantly flipping through 100-page rulebooks or opening the different files and wondering which ones my answer would be in. I also wanted to make it lightweight, private for just my group's use, and **hostable for free**, without needing to train an expensive AI model or rely on external APIs.


## Options I Explored (and Why I Didn’t Use Them)

| Tool/Option       | Why I Looked at It            | Why I Didn’t Use It                 |
| ----------------- | ----------------------------- | ----------------------------------- |
| ChatGPT API       | Natural language support      | $$$ and not self-hosted             |
| GPT4All           | Local LLM inference           | Too heavy for this use case         |
| Pinecone/Weaviate | Vector DB for semantic search | Overkill for keyword-based queries  |
| LangChain         | Full retrieval pipeline       | Added too much complexity           |
| ChatPDF / PDF.ai  | Fast for individuals          | Not private or customizable or free |

I realized I didn't actually need natural language processing—**keyword and fuzzy matching was enough**. I just needed it to understand the data and provide **fast, accurate rule recall**. I might expand on this in the future, but as a starting tool, I wanted to simplify my goal here.


## Tools and Tech Used

- **Python** (core script + backend logic)
- **Flask** (lightweight web server)
- **PyMuPDF** (`fitz`) for PDF parsing
- **FuzzyWuzzy** (for fuzzy matching)
- **HTML/CSS** (basic templating)
- **VS Code** for development
- **Render.com** (free tier deployment)
- **ChatGPT** for vibe coding and learning


## What I Learned

This was one of my first practical experiments applying lightweight AI techniques for personal use. I learned a ton about:
- Keeping scope tight
- Deploying apps (I had never uploaded to GitHub before!)
- Creating a front-end interface
- Chunking and adjusting weighting
- NLPs in general, what's out there and what they can do


## Updates I'm Considering

I might like to update this project with features like:
- Natural Language Processing for search
- A streamlined way to upload new PDF versions
- A "clear search" option
- A front-end that's actually designed


> Have you built something similar? How did you do it differently? Whether it's another PDF reference tool or just another tool for a TTRPG like Nimble, I'd be super curious to take a peek and learn what worked for you!