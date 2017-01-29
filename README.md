# To-View List #
This is a twist on the usual to-do list that most Javscript frameworks use as a benchmark for how easy they are to use.
This is just an exploration of using Preact with Redux and Webpack. Below are instructions on how to get this repo running.
Data for this is provided by the excellent [Movie Database](https://themoviedb.org).
This app is designed Mobile first but looks acceptable on Desktop.

## To-Do List ##
- [-] Add Tests
- [-] Add appcache
- [x] Service Worker
- [-] 100% PWA compatibility
- [-] Optimise using `shouldComponentUpdate` etc
- [-] Clean up code to clearly separate logic from rendering
- [-] Properly use `linkState` etc that preact brings
- [-] Add extra features


## Build ##
This was built using Preact Boilerplate: 
[![Build Status](https://travis-ci.org/developit/preact-boilerplate.svg?branch=master)](https://travis-ci.org/developit/preact-boilerplate)
[![gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/developit/preact)

Clone this repo and run `npm install`, you could use `yarn` if that's your cup of tea.

## Demo ##
See the running app at:
https://to-view-list.surge.sh

## Development Workflow

**4. Start a live-reload development server:**

```sh
npm run dev
```

> This is a full web server nicely suited to your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.

**5. Testing with `mocha`, `karma`, `chai`, `sinon` via `phantomjs`:**

```sh
npm test
```

**6. Generate a production build in `./build`:**

```sh
npm run build
```

> You can now deploy the contents of the `build` directory to production!
>
> **[Surge.sh](https://surge.sh) Example:** `surge ./build -d my-app.surge.sh`


**5. Start local production server with `superstatic`:**

```sh
npm start
```

> This is to simulate a production (CDN) server with gzip. It just serves up the contents of `./build`.



---

## License

MIT

[Preact]: https://developit.github.io/preact
[webpack]: https://webpack.github.io
