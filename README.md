DUSO

Installing:
	Install NodeJS & run NodeJS console.
	Choose a working directory and run command: 
		git clone https://github.com/VsevolodBobrovsky/duso.git
	Open /duso directory.
	Install gulp using command:
		npm install gulp
	Install dev dependencies using command:
		npm install --only=dev

Developing:
	Start gulp using command:
		gulp
	Websync will automatically open http://localhost:9000 in browser.
	All the changes in code will also be automatically watched.
	While creating a final build (production), remove all the comments from gulpfile.js - to uglify, minify, autoprefix code and to compress images.
	If any errors appear, try to use "gulp" command once again.

Instruments used:
	SCSS - to create stylesheets.
	rigger - to include templates into pages.
	Bootstrap - for page "Product".
	Slick.js - as an image slider.
	mCustomScrollbar - as a inner texts scrollbar.
