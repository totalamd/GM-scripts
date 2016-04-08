// ==UserScript==
// @name						lurkmore pictures fix
// @namespace				totalamd github
// @description			Repair broken pics and galleries on lurkmore.to and lurkmo.re, replacing its source from broken 'lurkmore.so' to actual page hostname (lurkmore.to/lurkmo.re).
// @description:ru	Чинит неправильные адреса картинок и галерей на lurkmore.to и lurkmo.re, заменяя в них lurkmore.so на текущее доменное имя открытой страницы (lurkmore.to/lurkmo.re).
// @match           *://lurkmo.re/*
// @match					  *://lurkmore.to/*
// @version					1.1.0.1
// @downloadURL			https://github.com/totalamd/lurkmore-pictures-fix/raw/master/lurkmore_pictures_fix.user.js
// @updateURL				https://github.com/totalamd/lurkmore-pictures-fix/raw/master/lurkmore_pictures_fix.user.js
// @grant						none
// ==/UserScript==

// TODO:
// - [ ] заменять прямые ссылки на картинки .so -> .to (https://lurkmo.re/Арабские_бунты/Сирия)

(function(){
	if (window.self === window.parent) {
		// retrieve list of all img elements and replace 'lurkmore.so' to actual page hostname in its src
		var imgList = document.querySelectorAll('img[src*="//lurkmore.so"]');
		for (var i = 0; i < imgList.length; i++) {
			imgList[i].src = imgList[i].src.replace(/lurkmore.so/, location.hostname);
		}
		
		// retrieve list of all a.image elements with "//lurkmore.so" in the beginning of its data-file-link
		// and replace 'lurkmore.so' to actual page hostname in it
		var aList = document.querySelectorAll('a.image[data-file-link^="//lurkmore.so"]');
		for (var i = 0; i < aList.length; i++) {
			aList[i].dataset.fileLink = aList[i].dataset.fileLink.replace(/lurkmore.so/, location.hostname);
		}
		
		// replace 'lurkmore.so' to actual page hostname in all links if page URI pathname starts with '/Файл:'
		var aExtList = [];
		if (decodeURI(document.location.pathname).match(/^\/Файл:/)) {
			aExtList = document.querySelectorAll('div#file>a');
			for (var i = 0; i < aExtList.length; i++) {
				aExtList[i].href = aExtList[i].href.replace(/lurkmore.so/, location.hostname);
			}
		}
	}
}())
