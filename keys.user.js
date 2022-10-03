// ==UserScript==
// @name         keys
// @version      0.1
// @description  Custom shortcuts
// @author       Kafva
// @namespace    https://raw.githubusercontent.com/Kafva/
// @downloadUrl  https://raw.githubusercontent.com/Kafva/clickerman/main/keys.user.js
// @updateUrl    https://raw.githubusercontent.com/Kafva/clickerman/main/keys.user.js
// @icon         https://i.imgur.com/H9x2R0b.png
// @include      *
// ==/UserScript==
//
// file:///Users/jonas/Repos/clickerman/keys.user.js

// Note that the GM_ APIs that are available differ between Violent/Tamper-monkey
//  https://violentmonkey.github.io/api/gm/
//  https://www.tampermonkey.net/documentation.php
// Violentmonkey is preferable since it works in both Chrome and Firefox but has
// fewer functions.
//
// Most `browser` API functions have a GM_ counterpart, but not everything...
// shortkeys can still be useful because of this:
//  https://github.com/crittermike/shortkeys/blob/master/app/scripts/background.js

window.addEventListener('keydown', (e) => {
  if (e.shiftKey) { // == With <Shift> ==
    switch (e.key) {
      default:
    }
  } else if (e.ctrlKey) { // == With <Control> ==
    switch (e.key) {
      case 'h': // Clear search highlight
        window.getSelection().removeAllRanges();
        break;
    }
  } else { // == Without modifiers ==
    switch (e.key) {
      default:
    }
  }
})
