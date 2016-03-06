// Google PageSpeed non-blocking, post-initial-paint css loader https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#example
// I shortened it for fun, and also added support for an array of stylesheets
export default (requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || window.addEventListener.bind(null, 'load'))(function() {
  ["//cdnjs.cloudflare.com/ajax/libs/marx/1.3.0/marx.min.css"].forEach(function(s) {
    var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = s;
    var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
  });
});