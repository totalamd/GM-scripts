// ==UserScript==
// @name            kinopoisk.ru replace flash youtube video to modern html5 video
// @name:ru         kinopoisk.ru заменяет flash-видео Youtube на современное html5 
// @description:ru  %description%
// @namespace       github.com/totalamd
// @match           *://*.kinopoisk.ru/*
// @version         1
// @downloadUR      https://raw.githubusercontent.com/totalamd/GM-scripts/master/kinopoisk.ru_replace_embed_youtube_to_iframe.user.js
// @updateURL       https://raw.githubusercontent.com/totalamd/GM-scripts/master/kinopoisk.ru_replace_embed_youtube_to_iframe.user.js
// @grant           none
// @noframes
// ==/UserScript==

"use strict";

(function(){
	const objList = Array.from(document.querySelectorAll('.youtubeTrailers > object'));
	objList.forEach(function(obj){
		const param = obj.querySelector('param[name="movie"]');
		const regexp = /https?:\/\/(?:www\.)youtube\.com\/v\/([\w-]+)/;
		let id;
		if (param.value.match(regexp)) {
			id = param.value.match(regexp)[1];
			const iframe = document.createElement('iframe');
			iframe.src = `//youtube.com/embed/${id}`;
			iframe.allowFullscreen = true;
			iframe.width = 490;
			iframe.height = 360;
			iframe.frameBorder = 0;
			obj.parentElement.replaceChild(iframe, obj);
		}
	});
}())
