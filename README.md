# birchlabs-frontpage
Frontpage of the Birchlabs website

Intention is to optimize frontpage for search engines.

This means:
- no Flash on frontpage.
- fast time-to-initial-paint
  - deferred CSS loading
- text and hyperlinks up the yin-yang

### Page-load

I am deferring CSS loading, using code from [Google PageSpeed](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example).

I don't mind the "Flash of Unstyled Content". _Yet_. Philosophy for now is: present the "minimum viable site" quickly, polish it as soon as possible.

### CSS reset

I've always wanted an excuse to use Matthew Blode's [Marx CSS](https://github.com/mblode/marx) stylesheet. So here we go.

## Development

Playing with Webpack's [Hot Module replacement](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html) so I can see changes live in my browser without changing application, or hitting refresh.

## References

- [Optimizing Webpack Production Build for React + ES6 Apps](https://medium.com/modus-create-front-end-development/optimizing-webpack-production-build-for-react-es6-apps-a637e5692aea#.klbavykoc) | [GitHub](https://github.com/ModusCreateOrg/webpack-react-es6-production-optimization)
  - [Webpack 2 Tree Shaking Configuration](https://medium.com/modus-create-front-end-development/webpack-2-tree-shaking-configuration-9f1de90f3233#.lai8aquep) | [GitHub](https://github.com/ModusCreateOrg/budgeting-sample-app-webpack2)
- [Hot Module replacement with Webpack](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)
- [Google PageSpeed - Optimize CSS delivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example)
- [React Hot Loader](https://gaearon.github.io/react-hot-loader/getstarted/)
  - [Troubleshooting](https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md)
    - [Query JSON config on chained loaders](https://github.com/webpack/webpack/issues/482)
- [webpack-dev-server API](http://webpack.github.io/docs/webpack-dev-server.html)