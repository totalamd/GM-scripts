// ==UserScript==
// @name        Youtube HTML5 Stop Autoplay
// @namespace   github.com/totalamd
// @description Stops Youtube HTML5 video autoplay
// @include     /^https?://www\.youtube\.com\/watch\?v=.*$/
// @version     1
// @grant       none
// ==/UserScript==

"use strict";

(function(){
	if (window.self === window.top) {
		let v = document.querySelector('video.html5-main-video');
		v.addEventListener('timeupdate', function pauseOnce() {
			v.pause();
			v.removeEventListener('timeupdate', pauseOnce);
		});
	}
})()
