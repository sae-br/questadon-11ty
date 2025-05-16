---
title: Random Project Idea Generator
description: A simple JavaScript project that started as a quote generator, then evolved into a quirky project idea machine—with reusable DOM interaction, array randomization, and no repeated results.
date: 2025-05-16
layout: layout.njk
tags: [project, javascript, eleventy]
---

# Random Project Idea Generator

## The Final Result

My very first JavaScript learning project started as a quote generator with a button. But then I turned it into something more fun and "me"—a **random project idea machine** that combines three elements to generate prompts like:

> “An alarm system for small business owners preparing for the end times.”

Each time you click the button, a new combination is generated from three curated lists. I also integrated it cleanly into my [Eleventy](https://www.11ty.dev/) site, styled it, and added logic to avoid repeat results.

You can see it live **at the bottom of my homepage!** Give it a whirl!

## What I Set Out to Build

Initially I just wanted to practice:
- Writing basic JavaScript functions
- Selecting elements with `getElementById`
- Using event listeners
- Randomizing items from an array

So I started by creating a basic quote generator that displayed a random inspirational quote from an array. 

I used [this article tutorial for a random quote generator](https://medium.com/@nambilucia/lets-build-a-simple-random-quote-generator-in-vanilla-js-50b13fcd9c39) to get me started, because it was recent and uses vanilla javascript. Thanks Lucia Nambi! 🙌

I went through all the code and had AI walk me through the concepts used (and it assigned me a bunch of practices for converting traditional functions to arrow functions, because I was really getting stuck on that.)

Once I understood how this separate little app worked on its own, I wanted to integrate it into my site and make it more "me".

I'm not much of a quote person. So I was like, what if instead it was an idea generator? 

And I figured from what I had learned about `Math.floor(Math.random() * quotes.length)` there had to be a way to do this for three sets of information and then just display them all as a single string.

There was. Yay!

## How I Built It

- I created three separate arrays (`ideas1`, `ideas2`, `ideas3`)
- I used a single function (`getRandomItem`) to select a random item from each
- I displayed the full result using `innerHTML`
- I added a reusable function to **avoid repeating the same value twice in a row**

Once it worked in a standalone folder, I:
- Created a Nunjucks partial (`quote-box.njk`)
- Inserted it as an include on my Eleventy homepage
- Moved the script into `/assets/quote.js`
- Styled it using scoped class names (`.quote-section`, `.quote-output`, etc.)
- Tweaked line widths with `max-width: 30ch` for better multi-line balance

## What I Learned About JavaScript

This project taught me a lot about:
- DOM manipulation (`document.getElementById`, `innerHTML`)
- Array use cases (especially selecting random items)
- Arrow functions vs. traditional functions
- Anonymous functions and callbacks
- The difference between `console.log()` (for developers) vs. DOM updates (for users)
- How to avoid immediate repeats with index tracking
- Writing helper functions

I also got more comfortable with:
- Structuring reusable components for static sites
- Separating concerns: logic in JS, layout in HTML, style in CSS

## Code Snippets

Here's what I ended up using, in case anyone cares for the quick look!

quote-box.njk
```html
<section class="quote-section">
  <h2 class="quote-h2">What to build? Find your next idea below!</h2>
  <div class="quote-container">
    <div class="quote-output" id="quote-output">A scheduling app for calisthenics trainers who don't have thumbs.</div>
    <button class="quote-button" id="quote-button">Fresh Idea</button>
  </div>
</section>
```

quote.js
```js
let button = document.getElementById('quote-button');
let output = document.getElementById('quote-output');
let ideas1 = [
  "A baby name generator", 
  "A haunted calendar", 
  "A crowdsourced treasure map", 
  "A vintage meme archive", 
  "A judgmental productivity app", 
  "A calorie calculator", 
  "A smartwatch app", 
  "A platformer game", 
  "A financial dashboard", 
  "A customer support chatbot", 
  "A dating simulator", 
  "A personality test", 
  "A virtual pet", 
  "An alarm system", 
  "A to-do list"
];
let ideas2 = [
  "for marine biologists", 
  "for Walmart greeters", 
  "for small business owners",
  "for high school teachers",
  "for nice folks",
  "for romantasy authors", 
  "for competitive knitters", 
  "for astronauts", 
  "for introverted teens", 
  "for dragons",
  "for food bloggers", 
  "for UX designers", 
  "for conspiracy theorists", 
  "for lost souls"
];
let ideas3 = [
  "trying not to fall asleep in a Zoom call.", 
  "renting out their backyard tree fort.", 
  "preparing for the end times.", 
  "trying to impress their cat.", 
  "who overthink everything.", 
  "looking for love.", 
  "who want to learn to play ukulele.", 
  "with trust issues.", 
  "obsessed with soup.", 
  "training for American Ninja Warrior.", 
  "learning to meditate.", 
  "building community.", 
  "fleeing the algorithm.", 
  "planning a vacation.", 
  "organizing their neopet collection."
];

function getRandomItem(arr, lastIndex) {
  let index;
  do {
    index = Math.floor(Math.random() * arr.length);
  } while (index === lastIndex);
  return [arr[index], index];
}

let last1, last2, last3;

button.addEventListener('click', () => {
  const [part1, i1] = getRandomItem(ideas1, last1);
  const [part2, i2] = getRandomItem(ideas2, last2);
  const [part3, i3] = getRandomItem(ideas3, last3);

  last1 = i1;
  last2 = i2;
  last3 = i3;

  const fullIdea = `${part1} ${part2} ${part3}`;
  output.innerHTML = fullIdea;
});
```

styles.css
```css
/* Quote Box */

.quote-section {
  padding: 2rem;
  text-align: center;
}

.quote-container {
  margin: 0 auto;
  padding-bottom: 1rem;
  background-color: var(--color-bg);
}

.quote-h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-secondary);
}

.quote-output {
  margin: 2rem auto;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-text);
  max-width: 30ch; /* sets a readable line length */
  text-align: center;
  line-height: 1.4;
}

.quote-button {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.quote-button:hover {
  background-color: var(--color-accent-dark);
}
```
