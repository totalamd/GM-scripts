// ==UserScript==
// @name           belssb.ru auto date insertion
// @name:ru        Автозаполнение формы для belssb.ru
// @description    Automatic account, date, phone and email fill in to electricity meters readout form at belssb.ru/individuals/pokaz/
// @description:ru Автоматическое проставление сегодняшней даты, вашего номера счёта, телефона и адреса почты в форме подачи данных на странице belssb.ru/individuals/pokaz/  
// @namespace      totalamd
// @match          http://belssb.ru/individuals/pokaz/
// @version        2.0
// @downloadURL    https://github.com/totalamd/GM-scripts/raw/master/auto_date_insertion.user.js
// @updateURL      https://github.com/totalamd/GM-scripts/raw/master/auto_date_insertion.user.js
// @grant          none
// @noframes
// ==/UserScript==

"use strict";
const l = function(){}, i = function(){};

(function(){
	// const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	const LOCALSTORAGE_NAME = GM_info.script.name;
	const INPUTS_LIST = ['#input-phone', '#input-email', '#input-account', '#input-c_delivery'];

	const save = () => {
		const info = {};
		INPUTS_LIST.forEach((selector) => {
			info[selector] = document.querySelector(selector).value;
		});
		localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(info));
	}

	const load = () => {
		const info = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
		if (info) {
			INPUTS_LIST.forEach((selector) => {
				document.querySelector(selector).value = info[selector];
			});
		}
	}

	load();
	document.querySelector('.submitButton').addEventListener('click', save);
	document.querySelector('#input-c_date').value = (new Date).toLocaleDateString();
	document.querySelector('#input-c_day').focus();
}());
