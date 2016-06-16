// ==UserScript==
// @name        youtube: allow fullscreen on every embed
// @namespace   github.com/totalamd
// @match       *://*/*
// @version     1.0.0.2
// @downloadURL https://github.com/totalamd/GM-scripts/raw/master/allow_fullscreen_on_every_embed_youtube.user.js
// @updateURL   https://github.com/totalamd/GM-scripts/raw/master/allow_fullscreen_on_every_embed_youtube.user.js
// @noframes
// ==/UserScript==

"use strict";
const l = function(){}, i = function(){};

(function () {
	// const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	Array.from(document.querySelectorAll('iframe')).forEach((iframe) => {
		if (iframe.src.match(/^https?:\/\/(?:www\.)?youtube\.com\/embed\//)) {
			iframe.allowFullscreen = true;
		}
	});

	const target = document.body;
	const config = {
		childList: true,
		subtree: true
	};
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			Array.from(mutation.addedNodes).forEach((node) => {
				if (node.tagName === "IFRAME" && node.src.match(/^https?:\/\/(?:www\.)?youtube\.com\/embed\//)) {
					node.allowFullscreen = true;
				}
			});
		});
	});

	observer.observe(target, config);
})();
