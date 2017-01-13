DUSO

Installing:
1. Install NodeJS & run NodeJS console.
2. Choose a working directory and run command: 
    git clone https://github.com/VsevolodBobrovsky/duso.git
3. Open /duso directory.
4. Install gulp using command:
    npm install gulp
5. Install dev dependencies using command:
    npm install --only=dev

Developing:
1. Start gulp using command:
    gulp
2. Websync will automatically open http://localhost:9000 in browser.
3. All the changes in code will also be automatically watched.
4. While creating a final build (production), remove all the comments from gulpfile.js - to uglify, minify, autoprefix code and to compress images.
5. If any errors appear, try to use "gulp" command once again.

Instruments used:
1. SCSS - to create stylesheets.
2. rigger - to include templates into pages.
3. Bootstrap - for page "Product".
4. Slick.js - as an image slider.
5. mCustomScrollbar - as a inner texts scrollbar.
