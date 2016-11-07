#Web Motion Periodic Table

Inspired on [this](http://foxcodex.html.xdomain.jp/index.html) great work, I want to recreate it using what we have available on our browsers instead of using images.

It's very much a work in progress on my spare time. You can see my advance [here](https://hectorfhurtado.github.io/webmotionperiodictable/)

### It doesn't runs everywhere yet

I'm using native __async/await__ features, that's why this project (as of today) works on Chrome Canary, Firefox Nightly and Microsoft Edge only (although on Edge it's still not implemented CSS variables). It's just a matter on time when everyone gets it, so, I'm preparing for that. This project seems rather huge and my time is very limited as for now.

### How to run locally

The only dependency is [nodejs](http://nodejs.org/).

You can clone this project and run `node server\index.js` on the terminal. There, you'll see the address where you can go on your browser. Right now this project code runs on Chrome and Firefox (don't know on Safari, I'm on a Windows machine). Once Edge implements CSS variables it's going to run there too.