// ==UserScript==
// @name						Rutracker.org: magnet-link for closed seeds
// @name:ru					Rutracker.org: magnet-ссылки для закрытых раздач
// @description			Auto-transform hash string to magnet link for banned threads on Rutracker.org
// @description:ru	Автоматически преобразует хэш-строку в magnet-ссылку в закрытых раздачах на Rutracker.org
// @namespace				github.com/totalamd
// @match						*://rutracker.org/forum/viewtopic.php?t=*
// @version					1
// @downloadURL			https://github.com/totalamd/GM-scripts/raw/master/Rutracker_magnet-link_for_closed_seeds.user.js
// @updateURL				https://github.com/totalamd/GM-scripts/raw/master/Rutracker_magnet-link_for_closed_seeds.user.js
// @grant						none
// @noframes				
// ==/UserScript==

"use strict";

(function(){
	if (!document.querySelector('a[href^="magnet:?"]')) {
		const span = document.querySelector('span#tor-hash');
		const hash = span.innerHTML;
		span.outerHTML = `<a href="magnet:?xt=urn:btih:${hash}&tr=http://bt.rutracker.cc/ann?magnet" class="med magnet-link-16" title="Скачать по magnet-ссылке"><img src="http://static.rutracker.org/templates/v1/images/icon_magnet_16_1.png" alt="magnet"><span id="tor-hash">${hash}</span></a>`;
	}
}())
