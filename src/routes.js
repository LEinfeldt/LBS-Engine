'use strict';

const React = require('react');
const Router = require('react-router-dom').Router
const Route = require('react-router-dom').Route
const IndexRoute = require('react-router-dom').IndexRoute
const Switch = require('react-router-dom').Switch;
const history = require('history');

//project imports
const app = require('./components/app.js');
const map = require('./components/map.js');
const pictureView = require('./components/pictureView.js');
const settings = require('./components/settings.js');

const myHistory = history.createHashHistory();

const Routes = function() {
    return (
        <Router history={myHistory}>
            <app.App>
                <Switch>
                    <Route exact path='/' component={map.Map} />
                    <Route path='/pictureView' component={pictureView.PictureView} />
                    <Route path='/settings' component={settings.Settings} />
                </Switch>
            </app.App>
        </Router>
    )
}


module.exports = {
    Routes: Routes
}