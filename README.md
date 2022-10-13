# AI-meme-maker

An AI that makes meme created by the Programming Team over at Blimp Academy.

# How to install

1. Make sure you have NodeJS and NPM
2. Install browserify globally:
`npm install -g browserify`

3. Clone the repo with Github CLI:
`gh repo clone ownsupernoob2/AI-meme-maker`

, download the ZIP and unZIP it or use Github Desktop to download it

4. use `npm install` which will download all the necessary dependencies

5. now you can test it out :)

# But how do you edit files?

1. Make *SURE* you are coding in src/main.js

2. everytime you save src/main.js use `browserify ./src/main.js -o ./scripts/main.js` which will make a copy to scripts folder where the html will use

3. This will have to run this script over and over everytime so becareful because I myself keep forgeting to use it.

# But why?

You see browsers don't support `require()` so *browserify* will convert it so the browser understand.

# You also might be asking why is there a lib file?

It is there because I'm too lazy to delete it. It is a conversion from ES6 to ES5 because most browsers can't support ES6 fully.
But I kept having errors because *browserify* doesn't work well when you turn it into ES5.
