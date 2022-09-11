// ==UserScript==
// @name         olc
// @version      0.1
// @description  Vim configuration for overleaf 
// @author       Kafva
// @namespace    https://raw.githubusercontent.com/Kafva/
// @downloadUrl  https://raw.githubusercontent.com/Kafva/clickerman/main/olc.user.js
// @updateUrl    https://raw.githubusercontent.com/Kafva/clickerman/main/olc.user.js
// @icon         https://i.imgur.com/ijdw1j9.png
// @include      https://*.overleaf.com/*
// ==/UserScript==

// For development: 
// 	file:///Users/jonas/Repos/clickerman/olc.user.js

// https://www.overleaf.com/learn/how-to/How_can_I_define_custom_Vim_macros_in_a_vimrc_file_on_Overleaf%3F#Example_script_with_TamperMonkey_to_add_keybindings
'use strict';

(() => {
	// poll until editor is loaded
	const retry = setInterval(() => {
		if (window._debug_editors === undefined) return
		clearInterval(retry)

		// get current editor instance
		const editor = window._debug_editors[window._debug_editors.length -1]

		// vim keyboard plugin
		const vimKeyboard = window.ace.require("ace/keyboard/vim")

		vimKeyboard.Vim.map("Y", "y$", "normal")
	
		// Graphical line movement
		vimKeyboard.Vim.map("k", "gk", "normal");
		vimKeyboard.Vim.map("j", "gj", "normal");
		vimKeyboard.Vim.map("<Up>", "gk", "normal");
		vimKeyboard.Vim.map("<down>", "gj", "normal");
		vimKeyboard.Vim.map("<up>", "<Esc>gki", "insert");
		vimKeyboard.Vim.map("<down>", "<Esc>gji", "insert");

		vimKeyboard.Vim.map("<C-a>", "0", "normal");
		vimKeyboard.Vim.map("<C-e>", "$", "normal");
		vimKeyboard.Vim.map("<C-a>", "<Esc>0i", "insert");
		vimKeyboard.Vim.map("<C-e>", "<Esc>$i", "insert");

		// set the modified keyboard handler for editor
		editor.setKeyboardHandler(vimKeyboard.handler);

		console.log("Custom key bindings applied");
	}, 1000)
})();
