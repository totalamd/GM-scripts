// ==UserScript==
// @name        Youtube Video Resumer
// @namespace   totalamd
// @match       *://*/*
// @version     1
// @downloadURL 
// @updateURL   
// @grant       GM_listValues
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// ==/UserScript==

// TODO:
// [ ] make autostop only on main site OR autoplay = 1

"use strict";

(function(){
	let l = function(){}, i = function(){};
	l = console.log.bind(console), i = console.info.bind(console);

	const embed_url_pattern = /^https?:\/\/(?:www.)?youtube\.com\/embed\/([\w-]+)/;               // embed iframe
	const main_url_pattern = /^https?:\/\/(?:www.)?youtube\.com\/watch\?v=([\w-]+)/;              // main YT site
	const video_id_pattern = /^https?:\/\/(?:www.)?youtube\.com\/(?:watch\?v=|embed\/)([\w-]+)/;  // overall regexp
	// const autoplay_pattern = / /;
	let video_id;
	let timing;
	let video = document.querySelector('video.html5-main-video');
	// console.log(`new run\n`, location.href, `\n`, video);

	
	function saveTiming () {
		if (!video.ended) {
			GM_setValue(video_id, video.currentTime);
			// console.info(document.title, video.currentTime);
		} else {
			GM_deleteValue(video_id);
			// console.log(document.title, '<< timeupdate ended detected');
		}
		if (!video) {console.warn("save: no video!"); return;}
		if (video.paused) console.info(document.title, video_id, '<< saved', video.currentTime);
	}

	function loadTiming () {
		if (!video) {console.warn("load: no video!"); video = document.querySelector('video.html5-main-video');}
		timing = GM_getValue(video_id);
		if (timing !== undefined) {
			console.info(document.title, video_id, '>> loading:', timing);
			video.currentTime = timing;
		} else {console.info(document.title, '>> new video');}
	}
	
	// TODO
	/*
	// if embeded
	if (location.hostname === "") { 
		// if autoplay=1
		if ()
	} else if (location.href.match(main_url_pattern) && (window.self === window.top)) {
		// AND NOT (main AND top)
		
	} else {
		// console.log('Not yotube video, exiting...');
		return;
	}
	*/
	
	if (location.hostname === "www.youtube.com") {
		video_id = location.href.match(video_id_pattern)[1];
		if (!video) {video = document.querySelector('video.html5-main-video');}
		loadTiming();
	
	// get all GET params
	/*let paramsArray = {};
	location.search.substr(1).split('&').forEach(function(e){
		paramsArray[e.split('=')[0]] = e.split('=')[1];
	});*/

		video.addEventListener('timeupdate', function(){
			// console.info('timeupdate!');
			saveTiming();
		});
		video.addEventListener('ended', function(){
			saveTiming();
		})
	} else {
		console.info(location.hostname, 'not youtube');
		return;
	}
})()
