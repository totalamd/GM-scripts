// ==UserScript==
// @name            rutracker.net anti-mirror
// @name:ru         rutracker.net убирает зеркальность
// @description     
// @description:ru  
// @namespace       github.com/totalamd
// @match           *://rutracker.net/*
// @exclude         
// @version         1
// @downloadURL     https://github.com/totalamd/GM-scripts/raw/master/rutracker.net_anti-mirror.user.js
// @updateURL       https://github.com/totalamd/GM-scripts/raw/master/rutracker.net_anti-mirror.user.js
// @grant           none
// @noframes
// @run-at          document-idle
// ==/UserScript==

"use strict";
const l = function(){}, i = function(){};

(function(){
	// const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	document.body.style.transform = '';
}())
