// ==UserScript==
// @name            Radio Reka broadcast records downloader
// @name:ru         Radio Reka: скачиватель передач
// @description     Makes command for ffmpeg converter to download and convert broadcast records to mp3. You just need to run it in command line (cmd.exe) in desired folder. Tags included.
// @description:ru  Формирует команду для конвертера ffmpeg для скачивания и конвертирования записи радиопередачи в mp3. Вам остаётся только запустить команду в консоли (cmd.exe) в желаемой папке. Теги проставляются автоматически.
// @namespace       github.com/totalamd
// @match           *://*.iba.org.il/*
// @exclude         
// @version         1
// @downloadURL 
// @updateURL   
// @grant           GM_addStyle
// @noframes
// ==/UserScript==

"use strict";
const l = function(){}, i = function(){};

(function(){
	// const l = console.log.bind(console, `${GM_info.script.name} debug:`), i = console.info.bind(console, `${GM_info.script.name} debug:`);

	const anchorsList = Array.from(document.querySelectorAll('a[onclick^="playAODProgram"]'));
	anchorsList.forEach(function(a) {
		const dlElem = document.createElement('span');
		dlElem.textContent = (navigator.language === "ru" ? "Скачать" : "Donwload");
		dlElem.className = "downloadButton";
		dlElem.addEventListener('click', function(e){
			showPrompt(a);
			e.stopPropagation();
		});
		a.appendChild(dlElem);
		a.parentNode.style.width = '100%'; // making parent div wider to fit new element;
	});

	function showPrompt(a) {
		const param = a.querySelector('.param').textContent;
		const alt_name = a.querySelector('.alt_name').textContent;
		const alt_date = a.querySelector('.alt_date').textContent.slice(0,8); // getting date only
		const INPUT = `http://iba-s.vidnt.com/iba_vod/_definst_/smil:${param}.smil/playlist.m3u8`;
		const PARAMS = `-q:a 1 -metadata genre=podcast -metadata date="${alt_date}" -metadata title="${alt_name} ${alt_date}" -metadata artist="Radio Reka" -metadata album="${alt_name}"`;
		const OUTPUT = `"${alt_name} (${alt_date}).mp3"`;
		const MSG_RU = "Скопируйте данную команду (CTRL-C) и запустите её из консоли в желаемой папке:";
		const MSG_EN = "Copy this command (CTRL-C) and run it through console in destination folder:";
		prompt((navigator.language === "ru" ? MSG_RU : MSG_EN), `ffmpeg -i ${INPUT} ${PARAMS} ${OUTPUT}`);
	}

	GM_addStyle(`.downloadButton {
			margin-left: 10px;
			border: 1px solid;
			border-radius: 3px;
			padding: 1px 5px;
			transition: .2s;
		}
		.downloadButton:hover {
			background-color: #ddd;
		}`);
}())
