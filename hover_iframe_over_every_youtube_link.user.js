// ==UserScript==
// @name            pop-up video iframe over every youtube link
// @name:ru         всплывающее видео при клике на youtube-ссылку
// @description     to close video press ESC or click on the grey background
// @description:ru  для закрытия видео нажмите ESC или кликнике на сервый фон вокруг видео
// @namespace       github.com/totalamd
// @match           *://*/*
// @exclude         *://*.youtube.com/*
// @version         1.0.2.5
// @downloadURL     https://github.com/totalamd/GM-scripts/raw/master/hover_iframe_over_every_youtube_link.user.js
// @updateURL       https://github.com/totalamd/GM-scripts/raw/master/hover_iframe_over_every_youtube_link.user.js
// @grant           none
// ==/UserScript==

// TODO:
// - [ ] fix catching 'esc' keydown event through youtube iframe
// - [ ] deal with removing all 'removing' event listeners if any one fired
// - [ ] add smooth hovering-up and -down

"use strict";
const l = function(){}, i = function(){};

(function(){
	// const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	const LinksList = Array.from(document.querySelectorAll('a'));
	LinksList.forEach(function (link) {
		if (link.hostname.match(/youtube\.com$|youtu\.be$/)) {
			link.addEventListener('click', openIframe);
		}
	});
	
	function openIframe (e) {
		let id;
		if (e.target.hostname.match(/^(?:www\.)youtube\.com$/) && e.target.search.match(/\?v=([\w_-]+)/)) {
			id = e.target.search.match(/\?v=([\w_-]+)/)[1];
		} else if (e.target.hostname.match(/^youtu\.be$/) && e.target.pathname.match(/\/([\w_-]+)/)) {
			id = e.target.pathname.match(/\/([\w_-]+)/)[1];
		} else {return;}
		l(id);
		e.preventDefault();
		const width = 853; //1280;
		const height = 480; //720;
		const hover_div = document.createElement('div');
		const iframe = document.createElement('iframe');
		hover_div.style.position = 'fixed';
		hover_div.style.width = '100%';
		hover_div.style.height = '100%';
		hover_div.style.top = 0;
		hover_div.style.left = 0;
		hover_div.style.backgroundColor = 'rgba(200, 200, 200, 0.6)';
		hover_div.style.zIndex = '103'; // hack against google SERP
		iframe.src = `//youtube.com/embed/${id}`;
		iframe.width = width;
		iframe.height = height;
		iframe.allowFullscreen = true;
		iframe.frameBorder = 0;
		iframe.style.position = 'absolute';
		iframe.style.left = window.innerWidth/2 - width/2 + 'px';
		iframe.style.top = window.innerHeight/2 - height/2 + 'px';
		hover_div.appendChild(iframe);
		document.body.appendChild(hover_div);
		i('add');
		hover_div.addEventListener('click', function removeIframeClick(e){
			document.body.removeChild(hover_div);
			i('remove');
			hover_div.removeEventListener('click', removeIframeClick);
		});
		document.addEventListener('keydown', function removeIframeEsc(e){
			i(e);
			if (e.key === "Escape") {
				document.body.removeChild(hover_div);
				i('remove');
				document.removeEventListener('click', removeIframeEsc);
			}
		})		
	}
}())
