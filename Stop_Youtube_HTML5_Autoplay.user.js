// ==UserScript==
// @name        Youtube HTML5 Stop Autoplay
// @namespace   github.com/totalamd
// @description Stops Youtube HTML5 video autoplay
// @match       *://www.youtube.com/watch?v=*
// @version     1
// @@updateURL  https://github.com/totalamd/GM-scripts/raw/master/Stop_Youtube_HTML5_Autoplay.user.js
// @downloadURL https://github.com/totalamd/GM-scripts/raw/master/Stop_Youtube_HTML5_Autoplay.user.js
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
