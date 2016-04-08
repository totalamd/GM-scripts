// ==UserScript==
// @name        n+1.ru fixes
// @description no crisp edges, time&dissiculty separator transition
// @namespace   totalamd
// @include     https://nplus1.ru/*
// @version     1
// @downloadURL 
// @updateURL   
// @grant       GM_addStyle
// @noframes
// ==/UserScript==

"use strict";

(function(){
	GM_addStyle(`
		img, .bg, .bg-fixed { image-rendering: auto !important;}
		.meta .tables p a span:nth-child(2n) {transition: border-color 0.5s;}
	`);
}())
