// ==UserScript==
// @name            kinopoisk.ru: replace flash youtube video to modern html5 video
// @name:ru         kinopoisk.ru: заменяет flash-видео Youtube на современное html5
// @namespace       github.com/totalamd
// @match           *://*.kinopoisk.ru/*
// @version         1.0.1
// @downloadURL     https://raw.githubusercontent.com/totalamd/GM-scripts/master/kinopoisk.ru_replace_embed_youtube_to_iframe.user.js
// @updateURL       https://raw.githubusercontent.com/totalamd/GM-scripts/master/kinopoisk.ru_replace_embed_youtube_to_iframe.user.js
// @grant           none
// @noframes
// ==/UserScript==

"use strict";

(function(){
	let l = function(){}, i = function(){};
	//l = console.log.bind(console), i = console.info.bind(console);

	const objList = Array.from(document.querySelectorAll('.youtubeTrailers > object'));
	objList.forEach(function(obj){
		const param = obj.querySelector('param[name="movie"]');
		const regexp = /https?:\/\/(?:www\.)youtube\.com\/v\/([\w-]+)/;
		const width = 490;
		const height = 360;
		let id;
		if (id = param.value.match(regexp)) {
			const iframe = document.createElement('iframe');
			iframe.src = `//youtube.com/embed/${id[1]}`;
			iframe.allowFullscreen = true;
			iframe.width = width;
			iframe.height = height;
			iframe.frameBorder = 0;
			obj.parentElement.replaceChild(iframe, obj);
		}
	});
}())
