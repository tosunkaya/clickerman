// Script to activate dark mode when opening YT
// in a private window (for dark mode to activate a reload is required)

// JSON config for brave
// jq .. ~/Library/Application Support/BraveSoftware/Brave-Browser/Default/Preferences

// Cookie db location
// ~/Library/Application Support/BraveSoftware/Brave-Browser/Default/Cookie
// sqlite3  Cookies 'select * from cookies' | grep -a -i youtube

// Comments online suggest that the VISITOR_INFO1_LIVE cookie is responsible for setting the
// dark theme but from my testing PREF seems to be used now instead (hl=en presumably sets language) 
const value  = 'f4=4000000&al=sv&f5=30&hl=en&f6=400';
const key   = 'PREF';

if ( document.cookie.search(`${key}=${value}`) == -1 ) {
	var expiry = new Date();
	expiry.setFullYear( expiry.getFullYear() + 2 );
	
	// Recall that assigning to the .cookie attribute doesn't work like a regular assignment
	// the `expires`, `domain` and `path` keys will not be stored in the document.cookie object directly
	// but are used by the browser. NOTE that to overwrite the existing PREF key we need to specify the
	// same domain and path as with the existing cookie attribute
	document.cookie = `${key}=${value}; expires=${expiry.toGMTString()}; path=/; domain=youtube.com;`; 
}
