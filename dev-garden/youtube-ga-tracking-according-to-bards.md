---
title: Ye Ole Youtube GA Tracking (According to Bards from 2013)
layout: layout.njk
date: 2025-05-09
description: Some medieval bard wrote the comments on this code back in 2013 or so, and finding it today delighted me to no end. 
---

# Ye Ole Youtube GA Tracking (According to Bards from 2013)

Okay, one of my favourite things lately is crawling under the hoods of websites to find jewels like this, which was written back in 2013 (and therefore might be super outdated but entertaining nonetheless). 

It's a bit like geocaching, eh? Devs leave fun little treasures somewhere, and someone finds it 13 years later and is just delighted. Humans can be great.

Looks like Lunametrics belongs to a different company now, but props to Sayf Sharif and whoever else may have crafted yon rousing ditty. Thy notes hath mightily informed me of the mad reasonings behind thy creation.

```js
//To Track Thy Youtube Upon Google Analytics
//Regardless the number of Players upon thy stage
//Performed by LunaMetrics http://www.lunametrics.com @lunametrics 
//and Sayf Sharif @sayfsharif
//Who beg thy forgiveness for the lack of the regular expression
//Forget thou not to subscribeth to our bloge: http://www.lunametrics.com/blog/
//CURTAIN
//
//Forsooth here doth we instantiate thy youtube player api 
//as it was written by the Google
var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//Then as a drop of rain we create two heavenly arrays
//who may hold in thy endless bossom our value
var videoArray = new Array();
var playerArray = new Array();
//twixt the jquery we fly to watch as the eagle does the mouse
//for the wanderous devil known as the iframe

(function($) {
	function trackYouTube()
	{
		//What am i, but nothing?
		var i = 0;
		//Harken to the iframes of the page
		//thy loathesome demon gallavanting upon
		//our innocent sweet html
		jQuery('iframe').each(function() {
			//but what is this?
			//an iframe! Avast!
			var video = $(this);
			//it has a source!
			//Lo we can see it's innards
			//as Han was wont to slice the tauntaun
			var vidSrc = "";
			vidSrc = video.attr('src');
			//We shall check the source
			//there are but two responses
			//lo ere the response incorrect
			//we shall ignore it.
			if(vidSrc.length>29){
				if(vidSrc.substr(0,29)=="http://www.youtube.com/embed/"){
					//It is a YouTube video!
					//Rip apart it's source to obtain it's
					//vile beating heart, the youtube id
					var youtubeid = vidSrc.substr(29);
					if(youtubeid.substr(-6)=="?rel=0"){
						//cut off last 6 digits as hannibal did to atreides
						//and offer them to your gods
						cutlength = youtubeid.length - 6;
						youtubeid = youtubeid.substr(0,cutlength);
					}
					//we now place the beating heart of the youtube id
					//in our first heavenly array
					videoArray[i] = youtubeid;
					//and then mark the vile iframe beast
					//with the id of this video so that all
					//may know it, and reference it
					$(this).attr('id', youtubeid);
					//And for this, I am no longer nothing, I am more
					i++;			
				}else if(vidSrc.substr(0,30)=="https://www.youtube.com/embed/"){
					//Again! But this time it is wearing armor
					//Lo, the beast video may think it is 
					//protected, but not from our might
					//rip out it's heart again
					var youtubeid = vidSrc.substr(30);
					if(youtubeid.substr(-6)=="?rel=0"){
						//again cut off last 6 digits as hannibal did to atreides
						//but this time burn them as an offering to the four winds
						cutlength = youtubeid.length - 6;
						youtubeid = youtubeid.substr(0,cutlength);
					}
					//and once again place this demonic youtube id
					//into the possession of the array where it shall hold
					videoArray[i] = youtubeid;
					//and again mark the vile id onto the iframe
					//so all may know it.
					$(this).attr('id', youtubeid);
					//once more my worth increases, i am again incremented
					i++;					
				}else{
					//An iframe, but not one we see as that containing
					//a source of the youtube. These we shall let pass
				}
			}
		});	
	}
	//The beginning!
	//Sometimes buried deep within the story
	//but here we start our tale in earnest
	$(document).ready(function() {
		//begin our quest to find the foul iframes
		//so infected with the source of the youtube
		trackYouTube();
	});
})(jQuery);
//When the API of YouTube doth load, it will call
//as if by magic
//this function or code. 
//be ready
function onYouTubeIframeAPIReady() {
	//Now the battle is engaged
	//we sweep through our array and reference the
	//beating hearts of the youtube id's
	//We then create a new holy object into our
	//second array, by referencing each beating
	//youtube id heart, and tell it wence it
	//shall act upon events
	for (var i = 0; i < videoArray.length; i++) {
		playerArray[i] = new YT.Player(videoArray[i], {
			events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
			}
		});		
	}
}
//Should one wish our monstrous video to play upon load
//we could set that here. But for us. We shall let it
//sleep. Sleep video. Await thy time.
function onPlayerReady(event) {
	//event.target.playVideo();
}
//When our caged monster wishes to act
//we are ready to hold it's chains
//and enslave it to our will.
function onPlayerStateChange(event) { 
	//it tries to trick us with a number one greater than
	//that of our arrays. But we outsmart it.
	//with math.
	videoarraynum = event.target.id - 1;
	//Should the video rear it's head
	if (event.data ==YT.PlayerState.PLAYING){
		_gaq.push(['_trackEvent', 'Videos', 'Play', videoArray[videoarraynum] ]); 
	} 
	//should the video tire out and cease
	if (event.data ==YT.PlayerState.ENDED){
		_gaq.push(['_trackEvent', 'Videos', 'Watch to End', videoArray[videoarraynum] ]); 
	} 
	//and should we tell it to halt, cease, heal.
	if (event.data ==YT.PlayerState.PAUSED){
		_gaq.push(['_trackEvent', 'Videos', 'Pause', videoArray[videoarraynum] ]); 
	}
	//and should the monster think, before it doth play
	//after we command it to move
	if (event.data ==YT.PlayerState.BUFFERING){
		_gaq.push(['_trackEvent', 'Videos', 'Buffering', videoArray[videoarraynum] ]); 
	}
	//and should it cue
	//for why not track this as well.
	if (event.data ==YT.PlayerState.CUED){
		_gaq.push(['_trackEvent', 'Videos', 'Cueing', videoArray[videoarraynum] ]); 
	} 
} 





Note: This tracks multiple videos on a web page by their id
```