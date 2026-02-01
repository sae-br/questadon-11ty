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
  output.textContent = fullIdea;
});