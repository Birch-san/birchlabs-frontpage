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

- [Optimizing Webpack Production Build for React + ES6 Apps](https://medium.com/modus-create-front-end-development/optimizing-webpack-production-build-for-react-es6-apps-a637e5692aea#.klbavykoc)
- [Hot Module replacement with Webpack](https://webpack.github.io/docs/hot-module-replacement-with-webpack.html)
- [Google PageSpeed - Optimize CSS delivery](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example)