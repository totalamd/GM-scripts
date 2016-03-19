// ==UserScript==
// @name            reestr.rublacklist.net URL decoder
// @name:ru         
// @description     
// @description:ru  
// @namespace       github.com/totalamd
// @match           *://*.rublacklist.net/*
// @exclude         
// @version         1
// @downloadURL 
// @updateURL   
// @grant           none
// @noframes
// ==/UserScript==

"use strict";

(function(){
	let l = function(){}, i = function(){};
	const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	const linksList = Array.from(document.querySelectorAll('a[href^="/rec/"]'));
	linksList.forEach(function(link){
		if (link.text.match(/^http/)) {
			link.text = decodeURIComponent(link.text.replace(/(.*)(#.*)/, function(match, p1, p2){p2=p2||""; return p1 + p2.replace(/\./g, '%');}));
			link.href = link.text;
		}
	});
}())