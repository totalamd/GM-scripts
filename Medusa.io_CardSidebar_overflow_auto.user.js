// ==UserScript==
// @name        Medusa.io old cards section CardSidebar overflow fix
// @namespace   totalamd
// @match       *://meduza.io/cards/*
// @version     1
// @downloadURL 
// @updateURL   
// @grant       none
// ==/UserScript==

"use strict";

(function(){
  if (window.self === window.top) {
		if (new Date() > Date.parse('Mar 01 2016')) {
			alert('Отключи скрипт для Meduza.io и проверь скролл на карточках');
		} else {
			document.querySelector('.CardSidebar').style.overflow = 'auto';
			// alert('card ok!');
		}
  }
}())
