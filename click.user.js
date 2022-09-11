// ==UserScript==
// @name         clickerman
// @version      0.1
// @description  Autoclicker for YouTube etc.
// @author       Kafva
// @namespace    https://raw.githubusercontent.com/Kafva/
// @downloadUrl  https://raw.githubusercontent.com/Kafva/clickerman/main/click.user.js
// @updateUrl    https://raw.githubusercontent.com/Kafva/clickerman/main/click.user.js
// @icon         https://i.imgur.com/ijdw1j9.png
// @include      https://*.youtube.com/*
// @include      https://*.google.com/*
// @include      https://*.google.se/*
// @include      https://*.twitch.tv/*
// @exclude      https://hangouts.google.com/*
// @exclude      https://ogs.google.com/*
// @exclude      https://contacts.google.com/*
// @exclude      https://mail.google.com/*
// @exclude      https://0.client-channel.google.com/*
// @exclude      https://*.google.com/recaptcha/*
// @exclude      https://*.google.com/maps/*
// ==/UserScript==

// For development: 
// 	file:///Users/jonas/Repos/clickerman/click.user.js

// Build for Firefox
//  web-ext build
//  web-ext sign --api-key $(cat ~/Config/secrets/mozilla_issuer) --api-secret $(cat ~/Config/secrets/mozilla.jwt)

const DEBUG = true
const CLICK_INTERVALL = 1000
const debug = (msg) => { DEBUG && console.log(msg); }

const GOOGLE_CONSENT = "[aria-label='Show me the privacy reminder later'],[aria-label='Got it'],[aria-label='No, thanks'],[aria-label='No thanks'],[aria-label='Agree to the use of cookies and other data for the purposes described'],[aria-label='Godkänn att cookies och annan data används för de ändamål som beskrivs']"
const TWITCH_BONUS = ".claimable-bonus__icon.tw-flex,[aria-label='Claim Bonus']"
const YT_STILL_WATCHING = ".style-scope.yt-button-renderer.style-blue-text.size-default[aria-label='Yes']"

/// Note that some pop-ups may be iframes from different domainis (e.g. consent.youtube.com)
/// to click these requires { "all_frames": true } and the
/// domain to appear in the "matches" inside manifest.json
const auto_click = (selector) => {

	const click_all = () => {
		const btns = document.querySelectorAll(selector);
		btns?.forEach( (b) => {
				b.click();
				b.remove();
				debug(`Clicked: '${b.innerHTML}' based on ${selector}`);
		});
	}

	// Execute once immediatelly
	click_all()
	setInterval(click_all, CLICK_INTERVALL)
}

const get_agree_button_selector = () => {
	// The agree button on google has an obfuscated class name
	let selector = ""
	if ( document.querySelector("[title='Before you continue to Google Search'],[title='Innan du fortsätter till Google Sök']") != null ) {
		document.querySelectorAll("button")?.forEach( btn => {
			// We can't select the div directly since the 'agree' and 'customise'
			// divs have the same selector
			btn.querySelectorAll("div").forEach( d => {
				if (d.innerText == "I agree" || d.innerText == "Jag godkänner"){
					selector = `#${btn.id}`;
				}
			})

		})
	}
	return selector == "" ? "" : "," + selector
}


window.onload = () => {
	const IS_LIVESTREAM = document.querySelector(".view-count")?.innerText.match(/watching now/) != null
	const IS_IFRAME     = window.self != window.top
	
	if ( window.location.host.match(".*.(youtube|google).com") ){
		if (!IS_LIVESTREAM && !IS_IFRAME){
			auto_click(
				YT_STILL_WATCHING + "," + 
				GOOGLE_CONSENT  +
				get_agree_button_selector()
			);
		} 
	}
	else if ( window.location.host.match(".*.twitch.com") ){
		auto_click(TWITCH_BONUS);
	}

	// Initialised
	debug("clickerman is running..." + 
		(IS_LIVESTREAM ? " (livestream)" : "") +
		(IS_IFRAME ? ` (iframe - ${window.location.href})` : "")
	);
}

