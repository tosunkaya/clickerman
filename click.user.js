// ==UserScript==
// @name         clickerman
// @version      0.1
// @description  Autoclicker for YouTube etc.
// @author       Kafva
// @namespace    https://raw.githubusercontent.com/Kafva/
// @downloadUrl  https://raw.githubusercontent.com/Kafva/clickerman/main/click.js
// @updateUrl    https://raw.githubusercontent.com/Kafva/clickerman/main/click.js
// @icon         https://i.imgur.com/ijdw1j9.png
// @include 	 https://*.youtube.com/*
// @include 	 https://*.google.com/*
// @include 	 https://*.twitch.tv/*
// ==/UserScript==

// For development use:
// @require      file:///Users/jonas/Repos/clickerman/click.js

// Build for Firefox
//  web-ext build
//  web-ext sign --api-key $(cat ~/Config/secrets/mozilla_issuer) --api-secret $(cat ~/Config/secrets/mozilla.jwt)

const DEBUG=true
const CLICK_INTERVALL = 1000
const DUPLICATE_CLICK_INTERVALL = 1000 * 10

const GOOGLE_CONSENT = "[aria-label='Show me the privacy reminder later'],[aria-label='Got it'],[aria-label='No, thanks'],[aria-label='No thanks'],[aria-label='Agree to the use of cookies and other data for the purposes described']"

const TWITCH_BONUS = ".claimable-bonus__icon.tw-flex"

// We need a selector more specific than the classes to avoid FPs
const YT_STILL_WATCHING = ".style-scope.yt-button-renderer.style-blue-text.size-default[aria-label='Yes']"

const debug = (msg) => { DEBUG && console.log(msg); }

/// Note that some pop-ups may are iframes from different domainis (e.g. consent.youtube.com)
/// to click these requires { "all_frames": true } and the
/// domain to appear in the "matches" inside manifest.json
async function autoClick(selectors) {

	// Only click each element once within a X second interval
	let clicked = new Set()
	setInterval( () => {
		clicked = new Set();
		debug("Clearing clicked set...");
	}, DUPLICATE_CLICK_INTERVALL)

	while (true) {
		for (const selector of selectors){
			const btns = document.querySelectorAll(selector);
			if (btns) {
				btns.forEach( (b) => {
					if ( !clicked.has(b.innerHTML) ) {
						b.click();
						clicked.add(b.innerHTML)
						debug(`Clicked: '${b.innerHTML}' based on ${selector}`);
					}
				});
			}
		}
		await new Promise(r => setTimeout(r, CLICK_INTERVALL));
	}
}

if ( window.location.host.match(".*.(youtube|google).com") ){
	autoClick([YT_STILL_WATCHING, GOOGLE_CONSENT]);
}
else if ( window.location.host.match(".*.twitch.com") ){
	autoClick([TWITCH_BONUS]);
}

// Initialised
debug("clickerman is running...");
