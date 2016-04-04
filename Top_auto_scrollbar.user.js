// ==UserScript==
// @name            Top auto scrollbar
// @description     Automatic appearing top horizontal scrollbar if the page length is more than thrice the height of the screen. Bar Height and opacity are ajustable by Greasemonkey custom menu.
// @description:ru  Горизонтальный скроллбар, автоматически появляющийся у верхнего края страницы, если она более чем в три раза длиннее экрана. Ширина и прозрачность настраивается в custom-меню Greasemonkey.
// @namespace       github.com/totalamd
// @match           *://*/*
// @exclude         
// @version         1.1.2
// @downloadURL     https://github.com/totalamd/GM-scripts/raw/master/Top_auto_scrollbar.user.js
// @updateURL       https://github.com/totalamd/GM-scripts/raw/master/Top_auto_scrollbar.user.js
// @grant           GM_listValues
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @noframes
// ==/UserScript==

// TODO:
// - [ ] think up how to declarate consts inside init() & make its global
// - [ ] make it work on peculiar sites like nplus1.ru
// - [x] add feature: click on bar scrolls top and back
// - [ ] detect DOM mutations

"use strict";
const l = function(){}, i = function(){};

(function(){
	// const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	function addToList() {
		let locations = GM_getValue('locations') || {};
		locations[location.hostname] = true;
		GM_setValue('locations', locations);
		location.reload();
	}

	function delFromList() {
		let locations = GM_getValue('locations');
		delete locations[location.hostname];
		GM_setValue('locations', locations);
		location.reload();
	}

	function clearList() {
		if (confirm('Are you sure?')) {
			let locationsList = '';
			for (let item in GM_getValue('locations')) {
				locationsList += '\n' + item;
			}
			console.log('Anti-activation list was:', locationsList);
			GM_deleteValue('locations');
		}
	}

	function showList() {
		if (!GM_getValue('locations')) {
			console.log('Anti-activation list is empty.');
		} else {
			console.log('Activation list:');
			for (let item in GM_getValue('locations')) {
				console.log(item);
			}
		}
	}

	function setHeight(){
		let height;
		if ((height = parseInt(prompt('enter height, in px', 5))) && (height > 0)) {
			GM_setValue('height', height + 'px');
			divContainerStyle.height = height + 'px';
		}
	}

	function setOpacity(){
		let opacity;
		if ((opacity = parseFloat(prompt('enter opacity, from 0 to 1', 0.8))) && (opacity > 0) && (opacity <= 1)) {
			GM_setValue('opacity', opacity);
			divContainerStyle.opacity = opacity;
		}
	}

	function update() {
		// setting nav tooltip
		window.scrollY ? navTooltip = navTooltipUp : navTooltip = navTooltipDown;
		const width = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) * 100;
		divBarStyle.width = width + '%';
		divContainer.title = `${width.toFixed()}%\nPage is ${(document.body.scrollHeight / window.innerHeight).toFixed(1)} times as high as screen\n${navTooltip}`;
	}

	GM_registerMenuCommand(`-- ${GM_info.script.localizedName} MENU --`);
	if (!(location.hostname in (GM_getValue('locations') || {}))) {
		GM_registerMenuCommand("Don't activate scrollbar on this site", addToList);
	} else {
		GM_registerMenuCommand("Reactivate scrollbar on this site", delFromList);
	}
	if (GM_getValue('locations')) {
		GM_registerMenuCommand("Clear anti-activation list", clearList);
	}
	GM_registerMenuCommand("Show anti-activation list", showList);
	GM_registerMenuCommand("Set bar height", setHeight);
	GM_registerMenuCommand("Set bar opacity", setOpacity);
	GM_registerMenuCommand("");

	if (document.body.scrollHeight / window.innerHeight <= 3) {
		l('Page\'s too short');
		return;
	} else if (location.hostname in (GM_getValue('locations') || {})) {
		l(`'${location.hostname}' is in the anti-activation list.`);
		return;
	}

	// declaration outside init() to make its 'global'
	const divContainer = document.createElement('div');
	const divBar = document.createElement('div');
	let divContainerStyle, divBarStyle;

	function init () {
		GM_addStyle(`
		.topAutoScrollbar-divContainer {
			position: fixed;
			opacity: ${GM_getValue('opacity') || 0.8};
			height: ${GM_getValue('height') || '5px'};
			width: 100%;
			top: 0px;
			left: 0px;
			background-color: cornflowerblue;
			z-index: 2147483647;
			cursor: pointer;
		}
		.topAutoScrollbar-divBar {
			height: 100%;
			background-color: hotpink;
			width: 0;
		}`);

		// get vars to bars width properties
		for (let sheet of document.styleSheets) {
			// "Security error" workaround for some external css
			if (!sheet.href) {
				for (let rule of sheet.cssRules) {
					switch (rule.selectorText) {
					case '.topAutoScrollbar-divContainer':
						divContainerStyle = rule.style;
						break;
					case '.topAutoScrollbar-divBar':
						divBarStyle = rule.style;
						break;
					}
				}
			}
		}
		divContainer.className = 'topAutoScrollbar-divContainer';
		divBar.className = 'topAutoScrollbar-divBar';
		divContainer.appendChild(divBar);
		document.body.appendChild(divContainer);
		// handle clicks on bar: scroll to top and back:
		divContainer.addEventListener('click', navigation);
	}

	let navTooltipUp = "Click to get to the top";
	let navTooltipDown = "Click to get back";
	let navTooltip = "";
	let memPosition;
	let origScrollBehavior;
	if (document.body.style.scrollBehavior) {
		origScrollBehavior = document.body.style.scrollBehavior;
	}

	function navigation () {
		// check to avoid unnecessary CSS manipulation:
		if (origScrollBehavior !== 'smooth') document.body.style.scrollBehavior = 'smooth';
		if (window.scrollY !== 0) {
			memPosition = window.scrollY;
			window.scrollTo(window.scrollX, 0);
		} else {
			window.scrollTo(window.scrollX, memPosition);
		}
		document.body.style.scrollBehavior = origScrollBehavior || '';
	}

	init();
	update();
	window.addEventListener('scroll', update);
}())
