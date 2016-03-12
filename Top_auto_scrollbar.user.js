// ==UserScript==
// @name            Top auto scrollbar
// @name:ru         %name%
// @description     Automatic appearing top scrollbar if the page length is more than twice the height of the screen
// @description:ru  %description%
// @namespace       github.com/totalamd
// @match           *://*/*
// @exclude         
// @version         1.0.1
// @downloadURL     https://github.com/totalamd/GM-scripts/raw/master/Top_auto_scrollbar.user.js
// @updateURL       https://github.com/totalamd/GM-scripts/raw/master/Top_auto_scrollbar.user.js
// @grant           GM_listValues
// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_registerMenuCommand
// @noframes
// ==/UserScript==

"use strict";
const l = function(){}, i = function(){};

(function(){
	const l = console.log.bind(console), i = console.info.bind(console);

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
			console.log('Anti-activation list was:\n', GM_getValue('locations'));
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
			divContainer.style.height = height + 'px';
		}
	}

	function setOpacity(){
		let opacity;
		if ((opacity = parseFloat(prompt('enter opacity, from 0 to 1', 0.8))) && (opacity > 0) && (opacity <= 1)) {
			GM_setValue('opacity', opacity);
			divContainer.style.opacity = opacity;
		}
	}

	function update() {
		divBar.style.width = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) * 100 + '%';
		divContainer.title = `${parseFloat(divBar.style.width).toFixed()}%\nThe page is ${(document.body.scrollHeight / window.innerHeight).toFixed(1)} times longer than the screen`
	}

	if (!(location.hostname in (GM_getValue('locations') || {}))) {
		GM_registerMenuCommand("Don't activate scrollbar on this site", addToList);
	} else {
		GM_registerMenuCommand("Reactivate scrollbar on this site", delFromList);
	}
	GM_registerMenuCommand("Clear anti-activation list", clearList);
	GM_registerMenuCommand("Show anti-activation list", showList);
	GM_registerMenuCommand("Set bar height", setHeight);
	GM_registerMenuCommand("Set bar opacity", setOpacity);

	if (document.body.scrollHeight / window.innerHeight <= 3) {
		l('Top scrollbar: page\'s too short');
		return;
	} else if (location.hostname in (GM_getValue('locations') || {})) {
		l(`'${location.hostname}' is in the anti-activation list.`);
		return;
	}

	const divContainer = document.createElement('div');
	const divBar = document.createElement('div');
	divContainer.style.position = 'fixed';
	divContainer.style.opacity = GM_getValue('opacity') || 0.8;
	divContainer.style.height = GM_getValue('height') || '5px';
	divContainer.style.width = '100%';
	divContainer.style.top = '0';
	divContainer.style.left = '0';
	divContainer.style.backgroundColor = 'cornflowerblue';
	divContainer.style.zIndex = '2147483647';
	divContainer.style.cursor = 'auto';
	divBar.style.height = '100%';
	divBar.style.backgroundColor = 'hotpink';
	divBar.style.width = '0';
	divContainer.appendChild(divBar);
	document.body.appendChild(divContainer);

	update();
	window.addEventListener('scroll', update);
}())
