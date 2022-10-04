# clickerman
The scripts can be installed via a script manager (e.g. violentmonkey) from the following links 

* [click](https://raw.githubusercontent.com/Kafva/clickerman/main/click.user.js)
* [keys](https://raw.githubusercontent.com/Kafva/clickerman/main/keys.user.js)
* [styles](https://raw.githubusercontent.com/Kafva/clickerman/main/styles.user.js)

For development in violentmonkey, open `file:///.../clickerman/<name>.user.js` in your browser (this automatically opens violentmonkey), check *Track local file before this window is closed* and click install. Provided that the installation window is left open, changes made to the file on disk will now be synced and applied in real time, i.e. we can use an external editor.

Note that the `GM_` APIs that are available differ between script managers:
* [Violentmonkey](https://violentmonkey.github.io/api/gm/)
* [Tampermonkey](https://www.tampermonkey.net/documentation.php)

Tampermonkey has more features but is only compatible with Chrome.
