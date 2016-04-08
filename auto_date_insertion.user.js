// ==UserScript==
// @name           belssb.ru auto date insertion
// @name:ru        Автозаполнение формы для belssb.ru
// @description    Automatic account, date, phone and email fill in to electricity meters readout form at belssb.ru/individuals/pokaz/
// @description:ru Автоматическое проставление сегодняшней даты, вашего номера счёта, телефона и адреса почты в форме подачи данных на странице belssb.ru/individuals/pokaz/  
// @namespace      totalamd
// @match          http://belssb.ru/individuals/pokaz/
// @version        1.1.0.1
// @downloadURL    
// @updateURL      
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @noframes
// ==/UserScript==

"use strict";

(function(){
	const ACCOUNT = GM_getValue('account', "");
	const EMAIL = GM_getValue('email', "");
	const PHONE = GM_getValue('phone', "");
	const ACCOUNT_PROMPT = navigator.language === 'ru' ? 'Введите номер счёта:' : 'Enter your account number:';
	const EMAIL_PROMPT = navigator.language === 'ru' ? 'Введите адрес электронной почты:' : 'Enter your email address:';
	const PHONE_PROMPT = navigator.language === 'ru' ? 'Введите номер телефона:' : 'Enter your phone number:';
	const MENU_ITEMS = navigator.language === 'ru' ? ['Запомнить счёт', 'Запомнить почту', 'Запомнить телефон'] : ['Set account', 'Set email', 'Set phone'];

	document.querySelector('#input-c_date').value = (new Date).toLocaleDateString();
	document.querySelector('#input-account').value = ACCOUNT;
	document.querySelector('#input-email').value = EMAIL;
	document.querySelector('#input-phone').value = PHONE;
	document.querySelector('#input-c_day').focus();

	GM_registerMenuCommand(MENU_ITEMS[0], setAccount);
	GM_registerMenuCommand(MENU_ITEMS[1], setEmail);
	GM_registerMenuCommand(MENU_ITEMS[2], setPhone);

	function setAccount() {
		GM_setValue('account', prompt(ACCOUNT_PROMPT));
	}
	function setEmail() {
		GM_setValue('email', prompt(EMAIL_PROMPT));
	}
	function setPhone() {
		GM_setValue('phone', prompt(PHONE_PROMPT));
	}
}())