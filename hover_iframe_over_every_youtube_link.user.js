// ==UserScript==
// @name            hover iframe over every youtube link
// @name:ru         всплывающее видео при клике на youtube-ссылку
// @description     to close video press ESC or click on the grey background
// @description:ru  для закрытия видео нажмите ESC или кликнике на сервый фон вокруг видео
// @namespace       github.com/totalamd
// @match           *://*/*
// @exclude         
// @version         1.0.1
// @downloadURL     https://github.com/totalamd/GM-scripts/raw/master/hover_iframe_over_every_youtube_link.user.js
// @updateURL       https://github.com/totalamd/GM-scripts/raw/master/hover_iframe_over_every_youtube_link.user.js
// @grant           none
// ==/UserScript==


// TODO:
// - [ ] fix catching 'esc' keydown event through youtube iframe
// - [ ] deal with removing all 'removing' event listeners if any one fired

"use strict";

(function(){
	let l = function(){}, i = function(){};
	l = console.log.bind(console), i = console.info.bind(console);

	const LinksList = Array.from(document.querySelectorAll('a'));
  LinksList.forEach(function(link) {
		link.addEventListener('click', openIframe);
  });
	
	function openIframe (e) {
		let id;
		if (e.target.hostname.match(/^(?:www\.)youtube\.com$/) && e.target.search.match(/\?v=([\w_-]+)/)) {
			id = e.target.search.match(/\?v=([\w_-]+)/)[1];
		} else if (e.target.hostname.match(/^youtu\.be$/) && e.target.pathname.match(/\/([\w_-]+)/)) {
			id = e.target.pathname.match(/\/([\w_-]+)/)[1];
		} else {return;}
		console.log(id);		
		e.preventDefault();
		const width = 560; //1280;
		const height = 315; //720;
		const hover = document.createElement('div');
		const iframe = document.createElement('iframe');
		hover.style.position = 'fixed';
		hover.style.width = '100%';
		hover.style.height = '100%';
		hover.style.top = 0;
		hover.style.left = 0;
		hover.style.backgroundColor = 'rgba(200, 200, 200, 0.5)';
		iframe.src = `//youtube.com/embed/${id}`;
		iframe.width = width;
		iframe.height = height;
		iframe.allowFullscreen = true;
		iframe.frameBorder = 0;
		iframe.style.position = 'absolute';
		iframe.style.left = `calc(50% - ${width/2}px)`;
		iframe.style.top = `calc(50% - ${height/2}px)`;
		hover.appendChild(iframe);
		document.body.appendChild(hover);
		console.info('add');
		hover.addEventListener('click', function removeIframeClick(e){
			document.body.removeChild(hover);
			console.info('remove');
			hover.removeEventListener('click', removeIframeClick);
		});
		document.addEventListener('keydown', function removeIframeEsc(e){
			console.info(e);
			if (e.key === "Escape") {
				document.body.removeChild(hover);
				console.info('remove');
				document.removeEventListener('click', removeIframeEsc);
			}
		})		
	}
}())
