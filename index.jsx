var React = require('react');
var ReactDOM = require('react-dom');

require('./deferred-css')
var Main = require('./Main.jsx');

ReactDOM.render(<Main/>, document.getElementById('root'));