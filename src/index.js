"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ons = require('onsenui');
var Ons = require('react-onsenui');
//project files
var main = require('./components/mainLayout.js');
var config = require('./config.json');
var map = require('./map.js');

//Main rendering function for the app. Loads the Navbar and the initial view
function App() {
    return (
        <main.Main title={config.app.name}>
            {map.Map}
        </main.Main>        
    );
};

ons.ready(function() {
    ReactDOM.render(  
        <App />,  
        document.getElementById('root')
    )
});