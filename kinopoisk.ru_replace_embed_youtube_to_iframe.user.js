// ==UserScript==
// @name            kinopoisk.ru replace flash youtube video to modern html5 video
// @name:ru         kinopoisk.ru заменяет flash-видео Youtube на современное html5 
// @description:ru  %description%
// @namespace       github.com/totalamd
// @match           *://*.kinopoisk.ru/*
// @version         1
// @downloadURL 
// @updateURL   
// @grant           none
// @noframes
// ==/UserScript==

"use strict";

(function(){
  let l = function(){}, i = function(){};
  l = console.log.bind(console), i = console.info.bind(console);

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
			//old.parentElement.replaceChild(new, old)
		}
	});
}())