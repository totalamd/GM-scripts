// ==UserScript==
// @name            vk.com remove /away.php redirect
// @name:ru         %name%
// @description:ru  %description%
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
	let linksList = Array.from(document.querySelectorAll('a[href^="/away.php?to=http"]'));
	console.info(linksList);
	const re = /https?\:\/\/vk.com\/away\.php\?to=([^&]*)(?:&post=[\d_-]*)?/;
	linksList.forEach(function(link){
		link.href = decodeURIComponent(link.href.match(re)[1]);
	});
}())