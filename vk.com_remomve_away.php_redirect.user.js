// ==UserScript==
// @name            vk.com direct external links
// @name:ru         Прямые внешние ссылки для vk.com
// @description     Make direct all external links on vk.com by removing redirect through vk.com/away.php
// @description:ru  Делает прямыми все внешние ссылки для сайта vk.com, убирая редирект через vk.com/away.php
// @namespace       github.com/totalamd
// @match           *://vk.com/*
// @version         1
// @downloadURL     
// @updateURL       
// @grant           none
// @noframes
// ==/UserScript==

// TODO:
// - [ ] detect page mutations

"use strict";

(function(){
	const re = /https?\:\/\/vk.com\/away\.php\?to=([^&]*)(?:&post=[\d_-]*)?/;

	let linksList = Array.from(document.querySelectorAll('a[href^="/away.php?to=http"]'));
	linksList.forEach(function(link){
		link.href = decodeURIComponent(link.href.match(re)[1]);
	});
}())