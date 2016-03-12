// ==UserScript==
// @name           LJ posts shortcut navigation
// @name:ru        Быстрые клавиши для навигация по постам в ЖЖ
// @description    Add Ctrl-→ and Ctrl-← shortcut navigation to go to Next/Prev journal entries.
// @description:ru Нажатие Ctrl-→ и Ctrl-← кидает на следующий/предыдущий пост
// @namespace      https://github.com/totalamd
// @match          *://*.livejournal.com/*
// @version        1.1.1
// @grant          none
// @downloadURL    https://github.com/totalamd/GM-scripts/raw/master/ljnav.user.js
// @updateURL      https://github.com/totalamd/GM-scripts/raw/master/ljnav.user.js
// @noframes
// ==/UserScript==

// changelog:
// [x] disable shortcuts in TEXTAREA and INPUT
// [x] make all regexps variables

"use strict";
const l = function(){}, i = function(){};

(function () {
	// const l = console.log.bind(console), i = console.info.bind(console);

	let journal, itemid, prevEntry, nextEntry;
	const journalRE = /(^[^.]*)\.livejournal.com$/;
	const itemidRE = /\/(\d+)\.html$/;
	
	if ((journal = document.location.hostname.match(journalRE)) && (itemid = document.location.pathname.match(itemidRE))) {
		prevEntry = 'http://www.livejournal.com/go.bml?journal=' + journal[1] + '&itemid=' + itemid[1] + '&dir=prev';
		nextEntry = 'http://www.livejournal.com/go.bml?journal=' + journal[1] + '&itemid=' + itemid[1] + '&dir=next';
		l('journal', 'itemid');
	} else {
		return;
	}
	
	document.addEventListener('keydown', function (e) {
		if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
			l('TEXTAREA or INPUT');
			return;
		};
		// left arrow pressed
		if (e.ctrlKey && e.keyCode == 37) {
			document.location = prevEntry;
			e.preventDefault();
		}
		// right arrow pressed
		if (e.ctrlKey && e.keyCode == 39) {
			document.location = nextEntry;
			e.preventDefault();
		}
	})
}())
