#Web Motion Periodic Table

Inspired on [this](http://foxcodex.html.xdomain.jp/index.html) great work, I want to recreate it using what we have available on our browsers instead of using images.

It's very much a work in progress on my spare time. You can see my advance [here](https://hectorfhurtado.github.io/webmotionperiodictable/)

### It doesn't runs everywhere yet

I'm using new browser features. It's just a matter on time when everyone gets it, so, I'm preparing for that. This project seems rather huge and my time is very limited right now. Summing up, It runs on Chrome Canary right now only. 

These are a list of features I'm using.

- __async/await__ It's present on Chrome, Firefox Nightly and Microsoft Edge.
- __CSS variables__ It's present on Chrome and Firefox.
- __Web components V1__ Present on Chrome Canary.  
- __Shadow DOM V1__ Present on Chrome Canary.  

### How to run locally

The only dependency is [nodejs](http://nodejs.org/).

You can clone this project and run `node server\index.js` on the terminal. There, you'll see the address where you can go on your browser. Right now this project code runs on Chrome Canary.