"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ons = require('onsenui');
const Ons = require('react-onsenui');
//project files
const main = require('./components/mainLayout.js');
const config = require('./config.json');
const map = require('./map.js');
const settings = require('./components/settings.js');
const pictureView = require('./components/pictureView.js');


function renderPage(route, navigator) {
    return (
        <route.component key={route.key} children={route.children} title={route.title} navigator={navigator} />
    )
};

//Main rendering function for the app. Loads the Navbar and the initial view
function App() {
    return (
        <Ons.Navigator 
            renderPage={renderPage}
            initialRoute={{
                component: main.Main,
                key: 'MAP_VIEW',
                children: <pictureView.PictureView />,
                title: config.app.name
            }}
        />
              
    );
};

ons.ready(function() {
    ReactDOM.render(  
        <App />,  
        document.getElementById('root')
    )
});