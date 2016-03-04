// ==UserScript==
// @name            Top auto scrollbar
// @name:ru         %name%
// @description     Automatic appearing top scrollbar if the page length is more than twice the height of the screen
// @description:ru  %description%
// @namespace       github.com/totalamd
// @match           *://*/*
// @exclude         
// @version         1
// @downloadURL 
// @updateURL   
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
		GM_setValue(location.hostname, true);
		location.reload();
	}
	
	function delFromList() {
		GM_deleteValue(location.hostname);
		location.reload();
	}

	function clearList() {
		if (confirm('Are you sure?')) {
			GM_listValues().forEach(function (e) {
				GM_deleteValue(e);
			})
		}
	}

	function showList() {
		console.log('Activation list:');
		GM_listValues().forEach(function (e) {
			console.log(e, GM_getValue(e));
		})
	}

	function update() {
		divBar.style.width = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) * 100 + '%';
		divContainer.title = parseFloat(divBar.style.width).toFixed() + '%';
	}

	if (!GM_getValue(location.hostname)) {
		GM_registerMenuCommand("Don't activate scrollbar on this site", addToList);
	} else {
		GM_registerMenuCommand("Reactivate scrollbar on this site", delFromList);
	}
	GM_registerMenuCommand("Clear activation list", clearList);
	GM_registerMenuCommand("Show activation list", showList);

	if (document.body.scrollHeight / window.innerHeight <= 3 || GM_getValue(location.hostname)) {
		return;
	}

	const divContainer = document.createElement('div');
	const divBar = document.createElement('div');
	divContainer.style.position = 'fixed';
	divContainer.style.opacity = '0.5';
	divContainer.style.height = '5px';
	divContainer.style.width = '100%';
	divContainer.style.top = '0';
	divContainer.style.left = '0';
	divContainer.style.backgroundColor = 'blue';
	divContainer.style.zIndex = '2147483647';
	divBar.style.height = '100%';
	divBar.style.backgroundColor = 'hotpink';
	divBar.style.width = '0';
	divContainer.appendChild(divBar);
	document.body.appendChild(divContainer);

	update();
	window.addEventListener('scroll', update);
}())