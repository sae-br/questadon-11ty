---
title: Article Rebrand Tool (Python + .docx Parsing)
description: A Python-based batch tool that rebrands old Word articles into a clean new template—complete with table support, text formatting, hyperlink preservation, and list handling.
date: 2025-05-24
layout: post.njk
tags: [project, document, python]
---

## The Final (for now) Result

I built a **Python batch conversion tool** that:
- Parses `.docx` Word articles with old branding
- Extracts and preserves paragraph styles, headings, tables, hyperlinks, bold/italic/underline formatting
- Rewrites each document into a new branded Word template
- Outputs fully restructured, consistently formatted `.docx` files

It’s not fancy, but it’s functional—**no Word macros, no manual editing, no open/save/reopen/reformat/repeat.** You drop files into a folder, run the script, and boom: clean new versions ready to go!

Here’s the repo: [Article Rebrand - GitHub](https://github.com/sae-br/article-rebrand)

It’s not polished to perfection (yet), but it did help me crank through **160 documents**, which feels p-rettyyyy dang satisfying. In its current version, I definitely did need to give them the manual review, but I figure maybe it can be improved for something in the future!

 

## What I Set Out to Build

I had a batch of old Word articles that needed to be rebranded to match a new template—complete with updated paragraph styles, cleaner layout, and no weird formatting artifacts from the early 2000s.

Some had tables. Some had merged cells. Some had hyperlinks. Some used bullet lists. This is one of those tasks I've done or assigned to people and it's just super tedious. So I tried making Python do it for me instead.
 


## Tools and Tech Used

- **Python 3**  
- **python-docx** (for reading and writing `.docx` files)  
- **docx2python** (for reading Word textboxes)  
- **lxml / XML tags** (for formatting hyperlinks and table borders)  
- **VS Code** (for building it)  
- **GitHub** (first time posting a doc tool!)  

 

## What It Can Do (Current State)

✅ Automatically:
- Extracts and rewrites:
  - Titles 
  - Headings
  - Paragraphs
  - Bold / italic / underline styles
  - Tables (with basic formatting)
  - Hyperlinks
  - Unordered lists (bullets)

❌ Still needs manual help with:
- Ordered lists (numbered steps don’t auto-detect, so currently I've got them outputting to unordered lists)
- Complex table formatting (merged cells, varied column widths, etc)
- Mixed formatting inside hyperlinks
- No image support

It’s good enough to *clean up a big pile of documents quickly*, but not perfect.

 

## What I Learned

Honestly? A TON, cuz this was way out of my depth. I think this is one I'll come back to later on and have lots of "ohhhhh, THAT's why that worked" moments.

- How Word documents are built under the hood (hello XML rabbit hole)
- How to process structured text using `python-docx`
- That hyperlinks in Word are surprisingly complicated



## Future Improvements

Things I’d like to tackle next:
- Proper support for numbered lists
- Smarter handling of tables
- Maybe image support?
- Add a third step (or separate program?) to batch convert the .docx to .pdf to round out the process after manual review
- Real error handling and logs perhaps?

 

> If you’ve done something similar—maybe rebranding Word docs, building document processing pipelines, or working with styled exports—I’d love to hear how you handled the hard parts. And if you have suggestions on how to fix any of the stuff I couldn't figure out, PLEASE BE MY HERO AND SAY SOMETHING.
>
>Okay, that's a wrap for now.