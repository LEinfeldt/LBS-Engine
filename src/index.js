'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const ons = require('onsenui');
// const Ons = require('react-onsenui');
const Router = require('react-router-dom').Router
//project files
const routes = require('./routes.js');


ons.ready(function() {
    ReactDOM.render(
        <routes.Routes />,
        document.getElementById('root')
    );
});