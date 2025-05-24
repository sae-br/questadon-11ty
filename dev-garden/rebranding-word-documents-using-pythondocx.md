---
title: Rebranding Word Documents to Use a New Branded Template (A First Attempt at python-docx and docx2python)
date: 2025-05-24
description: I had 160 articles to rebrand, so I tried to make Python do it for me. Mostly successful!
layout: layout.njk
---

# Rebranding Word Documents to Use a New Branded Template (A First Attempt at python-docx and docx2python)

 

I made this because I had 160 articles to rebrand for work, and figured I'd make a personal project of it. But gosh, this pushed way beyond what I've worked with before.

The goal was to reformat old .docx articles into a clean new branded style using a Word template, all as a batch. 

I learned about the python-docx library, low-level XML manipulation, and building structured content transformation pipelines... this was all super new for me and probably more advanced than I SHOULD have gone at my current level. But hey, pretty in character for me to throw myself into the deep end and try not to drown. ;) 

I've got a parser.py to detect elements of the old docs and a writer.py to create the new docs, and a convert.py for single file tests and convert_batch.py for all 160 (no limit I'm aware of?).

Here's the [GitHub folder](https://github.com/sae-br/Article-Rebrand)

 
## **Libraries and Tools I Used**

### **python-docx**

[Documentation](https://pypi.org/project/python-docx/)
[Many thanks to Scanny!](https://pypi.org/user/scanny/)

I used this library to read and write Word .docx files. Most of the document structure work happened with this.
  

Key things I worked with:

- `Document(...)` – to create or load a .docx
- `.add_paragraph()` and `.add_run()` – to insert styled text
- `.add_table()` – to generate and format tables
- `.paragraphs[0]._element.getparent().remove(...)` – this was used to delete placeholder content from my Word template

There were a few things I wanted to do that python-docx can’t handle out of the box—like clickable hyperlinks, table cell borders, and padding. So I dropped down into the WordprocessingML XML layer, which I still don't think I quite understand yet, to be honest.

Key functions and objects:

- `OxmlElement(...)` – to create custom XML tags like `<w:hyperlink>`, `<w:r>`, `<w:tcBorders>`
- `parse_xml(...)` – to convert a raw XML string into an element
- `qn(...)` – to apply the correct namespace prefix to tags

 
### **docx2python**

[Documentation](https://pypi.org/project/docx2python/)
[Many thanks to ShayHill!](https://pypi.org/user/ShayHill/)

Used only for extracting the title text from textboxes, since python-docx can’t read headers or textboxes very well.

 
This was a good learning stretch for me and helped me understand how Word documents are really structured under the hood.

 
## **Design Elements My Article Rebrander Can (and Can't) Handle**

  
### **Paragraph Types**

The parser detects these block types:

- heading2, heading3  
- paragraph
- list_item (used for both bulleted and numbered lists for now)
- table

Each type is output with the correct style name from my template (like “Body Text”, “List Paragraph”, etc). This gave me full control over the final formatting.

  
### **Lists**

Unordered and ordered list detection was trickier than expected. I spent like 2 hours trying things that kept not working for the ordered lists.

For now, I settled on treating all list items as list_item, and styled them uniformly as unordered lists. Hyperlinked text inside list items is also supported.

Partial win here.
  

### **Tables**

Tables are generated row by row, and for each cell:

- Borders are added (light grey)
- Internal margins/padding are applied
- Text formatting (bold, italic, underline) is preserved

This only works for simple tables. For example merged cells, column widths, and specific table formatting isn't preserved.

Another partial win!

 

## **Things I'm Learning as a Programming Noob**

This project helped me:

- Understand how to use python-docx for both reading and writing Word content
- Dive into XML-based formatting using OxmlElement
- Improve my ability to modularize code and handle complex document structures
- Debug layout issues that didn’t come from syntax errors but from subtle Word styling quirks

I encountered some small pieces for the first time as well:

- Wrote my first README.md file
- Learned what a .gitignore is and used one
- I didn't realize you can't comment in a JSON file, but now I know!
- I **tested out GitHub Copilots and to be honest, it wasn't a win for me.** It misunderstood my instructions and gave incorrect responses for almost all the things I wanted it to do, so I fell back on my good faithful non-optimal ChatGPT. Which sent me in circles on the ordered list issue for a long time but helped me find the libraries, figure out how to implement them, and get to where I got with this!

 
This was a stretch project for me and a rewarding one—I built something genuinely useful, and got much better at handling real-world Python code in the process. 

I don't know if I SAVED myself time on converting those articles, ha, but I learned a heck of a lot more than I would have by monotonously doing them all manually one by one.