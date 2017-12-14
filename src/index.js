"use strict";

const React = require('react');
const ReactDOM = require('react-dom');
const ons = require('onsenui');
const Ons = require('react-onsenui');
//project files
const main = require('./components/mainLayout.js');
const config = require('./config.json');
const map = require('./map.js');


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
                children: map.Map,
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
/////////////////////////////////////////////////////////////////////////////////////
/*
var index = 0;

var MyPage = React.createClass({
  renderToolbar: function(route, navigator) {
    const backButton = route.hasBackButton
      ? <Ons.BackButton onClick={this.handleClick.bind(this, navigator)}>Back</Ons.BackButton>
      : null;

    return (
      <Ons.Toolbar>
        <div className='left'>{backButton}</div>
        <div className='center'>{route.title}</div>
      </Ons.Toolbar>
    );
  },

  handleClick: function(navigator) {
    ons.notification.confirm('Do you really want to go back?')
      .then((response) => {
        if (response === 1) {
          navigator.popPage();
        }
      });
  },

  pushPage: function(navigator) {
    navigator.pushPage({
      title: `Another page ${index}`,
      hasBackButton: true
    });

    index++;
  },

  renderPage: function(route, navigator) {
    return (
      <Ons.Page key={route.title} renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
        <section style={{margin: '16px', textAlign: 'center'}}>
          <Ons.Button onClick={this.pushPage.bind(this, navigator)}>
            Push Page
          </Ons.Button>
        </section>
      </Ons.Page>
    );
  },

  render: function() {
    return (
      <Ons.Navigator
        swipeable
        renderPage={this.renderPage}
        initialRoute={{
          title: 'First page',
          hasBackButton: false
        }}
      />
    );
  }
});

ons.ready(function() {
  ReactDOM.render(<MyPage />, document.getElementById('app'));
});*/