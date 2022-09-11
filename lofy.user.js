// ==UserScript==
// @name         lofy
// @version      1.0
// @description  Shortcuts for lofy
// @author       Kafva
// @namespace    https://raw.githubusercontent.com/Kafva/
// @downloadUrl  https://raw.githubusercontent.com/Kafva/clickerman/main/lofy.user.js
// @updateUrl    https://raw.githubusercontent.com/Kafva/clickerman/main/lofy.user.js
// @icon         https://i.imgur.com/4OCZymB.png
// @include      https://lofy/*
// @include      http://lofy/*
// @include      https://lofy:20111/*
// @include      http://lofy:20111/*
// ==/UserScript==

// Install via:
//  file:///Users/jonas/Repos/clickerman/lofy.user.js

/**
* Values for `ul_pos`:
* Local playlists: 2
* Local albums:    4
* YT playlists:    4
*/
const click_list = (name, ul_pos) => {
	document.querySelectorAll(
		`#sidebar > ul:nth-child(${ul_pos}) > li > span`
	).forEach( (el) => {
		if (el.innerHTML == name) {
			console.log("(lofy.user.js) Clicking:", el)
			el.click()
		}
	})
}

window.addEventListener('keydown', (e) => {
	switch (e.key) {
	case "Z":
		click_list("shi", 2)
		break;
	case "z":
		click_list("moon", 2)
		break;
	}
})

