// ==UserScript==
// @name            reestr.rublacklist.net URL decoder
// @name:ru         Киллические адреса страниц для списка reestr.rublacklist.net
// @description     
// @description:ru  
// @namespace       github.com/totalamd
// @match           *://*.rublacklist.net/*
// @exclude         
// @version         1.0.0.1
// @downloadURL     https://github.com/totalamd/GM-scripts/raw/master/reestr.rublacklist.net_URL_decoder.user.js
// @updateURL       https://github.com/totalamd/GM-scripts/raw/master/reestr.rublacklist.net_URL_decoder.user.js
// @grant           none
// @noframes
// ==/UserScript==

"use strict";
const l = function(){}, i = function(){};

(function(){
	const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	const linksList = Array.from(document.querySelectorAll('a[href^="/rec/"]'));
	linksList.forEach(function(link){
		if (link.text.match(/^http/)) {
			link.text = decodeURIComponent(link.text.replace(/(.*)(#.*)/, function(match, p1, p2){p2=p2||""; return p1 + p2.replace(/\./g, '%');}));
			link.href = link.text;
		}
	});
}())
