# birchlabs-frontpage
Frontpage of the Birchlabs website

## Goals
Intention is to optimize frontpage for search engines.

This means:
- no Flash on frontpage.
- fast time-to-initial-paint
  - deferred CSS loading
- text and hyperlinks up the yin-yang

This will also give mobile users the ability to find their way to any non-Flash content on the website.

## Development

### Try it yourself

#### Pre-requisites

You may as well update Node and `npm` to the very latest versions.

Mac users who installed Node via Homebrew can update both of those [like so](http://stackoverflow.com/a/11298299/5257399):

```bash
brew update
brew upgrade node
npm install -g npm
```

You should globally install bleeding-edge versions of `webpack` and `webpack-dev-server`.

```bash
npm install -g webpack@^2.1.0-beta.4 webpack-dev-server@^2.0.0-beta
```

> Note: it's _possible_ that installing `webpack` and `webpack-dev-server` globally is *not* strictly necessary, as we `npm install` those anyway as dev dependencies, and we launch at least `webpack-dev-server` from the `node_modules` folder.

You should also get the [LiveReload plugin for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) or whatever if you want to try out the hot module reloading.

#### Acquire code

Clone this repository.

```bash
git clone https://github.com/Birch-san/birchlabs-frontpage.git
```

#### Initial setup

Install, including dev dependencies.

```bash
npm install
```

### Serve website locally for development

This launches (on port 3000) a `webpack-dev-server`

```bash
npm start
```

The website is served on http://localhost:3000/

It should just say:

```
Yo

wassup
```

There's not _actually_ anything to see from a content point of view. The architecture of the hot reloading is the only interesting thing here.

You can modify files like `client/Main.jsx` to watch the hot module reloading work its magic.

### Build compressed production bundle

This uses Webpack, Babel, and UglifyJS to make a (relatively) small production distribution of the website.

```bash
npm run build
```

## Interesting aspects of the development

### Hot module replacement

I am playing with Webpack's [Hot Module replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html) so I can see changes live in my browser without changing application, or hitting refresh.

### Deferred CSS loading

I am deferring CSS loading, using code from [Google PageSpeed](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example).

This enables me to present quickly a "minimum viable site" — styling can arrive slightly later. I don't mind the "Flash of Unstyled Content". _Yet_.

> Note: eventually the project evolved such that React would build the DOM at runtime. This meant we no longer enjoyed a "minimum viable site as soon as possible".

### CSS reset

I've always wanted an excuse to use Matthew Blode's [Marx CSS](https://github.com/mblode/marx) stylesheet. So here we go.

## Postmorterm

I got distracted trying out `webpack` and hot module replacement; I wanted to add an element to the webpage, and see the page update live without refreshing my browser.

I _also_ wanted something smarter than just a "hits browser refresh for me" — I wanted to hot-reload page _partials_.

To hot-reload page _partials_ (like an individual table), I figured I would need to compose page partials as _components_ — for example as ReactJS classes.

This introduced a dependency on ReactJS. ReactJS is *big*. At the time of writing: the compressed, production version of `React.js` 0.14.7 is 136KB. `React-dom.js` adds another 706 bytes, (for what it's worth).

I figured "well, let's use tree-shaking to cut out the bits of React we don't need".

I was able to get my vendor dependencies down to 129KB. I assume that `React` and _maybe_ `React-dom` were the only dependencies of mine understood by Webpack to be from vendors, but it is not inconceivable that Babel inflated this by adding shims for browser compatibility. I have not investigated that possibility.

### Problems

So, there were two problems. 129KB of JS to download (and then parse!) is an unacceptable workload required for getting to the initial page paint. But also hot module reloading wasn't working as expected.

#### Payload size

Server-side rendering could perhaps solve the payload problem (make the webserver produce the page view, and deliver it statically), but my hosting does not provide anything as fancy as a NodeJS server.

#### Hot module reload

Hot module reload seems to — upon changing _any_ source file — rebuild the _whole_ webpage… twice. I assume it does not understand that my React components are side-effectless, so it reloads the whole page "just in case". I am _not_ sure why it reloads _twice_, though.

I assume the [React Hot Loader](https://gaearon.github.io/react-hot-loader/getstarted/) for Webpack is designed to solve this problem. However it does _not_ seem to be compatible with Babel loader — despite what the tutorial insists.

Specifically, I get ["SyntaxError: 'import' and 'export' may only appear at the top level"](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md) — which implies that `babel-loader` is not translating the ES6 code to ES5 before handing it to `react-hot`.

There is some ambiguity as to what the correct way is to pass query params to a loader when you chain a list of loaders, but [I tried at least one thing which I thought was correct](https://github.com/Birch-san/birchlabs-frontpage/commit/d4f82667ffac1d71bb1ef597956403bc4db000e7#diff-11e9f7f953edc64ba14b0cc350ae7b9dR72). Even with my best attempt, I was still unable to avoid the "SyntaxError".

I wonder if this is due to using bleeding-edge versions of everything (for example: Webpack 2.0)? Perhaps support has been lost somewhere along the way.

I might not be completely insane/incompetent; I assert that Grgur Grisogono [bumped into the same problem](https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2/blob/master/webpack.config.js#L38).

### Conclusions

I have convinced myself that the dream of hot module reloading is not _quite_ here yet. Even if it _is_, the price paid seems to be "add a dependency on ReactJS", which is too large for a page whose goal is to quickly present a site-map.

Maybe hitting refresh is not so bad. Or maybe I could settle for "LiveReload will refresh the whole page; at least it means _you_ don't have to".

I expect I will start again using [`Brackets.app`](http://brackets.io/), which I remember had very nice built-in support for reloading page partials on _simple_ webpages.

## References

- [Optimizing Webpack Production Build for React + ES6 Apps](https://medium.com/modus-create-front-end-development/optimizing-webpack-production-build-for-react-es6-apps-a637e5692aea#.klbavykoc) | [GitHub](https://github.com/ModusCreateOrg/webpack-react-es6-production-optimization)
  - [Webpack 2 Tree Shaking Configuration](https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.lai8aquep) | [GitHub](https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2)
- [Hot Module replacement with Webpack](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)
- [Google PageSpeed - Optimize CSS delivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example)
- [React Hot Loader](https://gaearon.github.io/react-hot-loader/getstarted/)
  - [Troubleshooting](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md)
    - [Query JSON config on chained loaders](https://github.com/webpack/webpack/issues/482)
- [webpack-dev-server API](http://webpack.github.io/docs/webpack-dev-server.html)