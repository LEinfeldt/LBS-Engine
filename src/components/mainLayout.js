"use strict";

const React = require('react');
const Ons = require('react-onsenui');

//custom files
const settings = require('./settings.js');

/**
 * Main frame for the app.
 * Contains the Toolbar in the top and a sidebar to select the mode
 */
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.state = {
            isOpen: false
        }
    }

    //toolbar on top of the app, contains name of the app and the menu button
    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='center'>{this.props.title}</div>
                <div className='right'>
                    <Ons.ToolbarButton onClick={this.show}>
                        <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
                    </Ons.ToolbarButton>
                </div>
            </Ons.Toolbar>
        )
    }

    //hide sidebar
    hide() {
        this.setState({isOpen: false});
    }

    //show sidebar
    show() {
        this.setState({isOpen: true});
    }

    //insert rows into the sidebar, with image and name
    renderRow(title, index) {
        if(index == 0) {
            return (
                <Ons.ListItem 
                    key={index} 
                    tappable={true}>
                    <div className='left'>
                        <Ons.Icon icon='md-map'/>
                    </div>
                    <div className='center'>
                        {title}
                    </div>
                </Ons.ListItem>
            )
        }
        else if(index == 1) {
            return (
                <Ons.ListItem 
                    key={index} 
                    tappable={true}>
                    <div className='left'>
                        <Ons.Icon icon='md-image'/>
                    </div>
                    <div className='center'>
                        {title}
                    </div>
                </Ons.ListItem>
            )
        }
        else {
            return (
                <Ons.ListItem 
                    key={index} 
                    tappable={true}>
                    <div className='left'>
                        <Ons.Icon icon='md-settings'/>
                    </div>
                    <div className='center'>
                        {title}
                    </div>
                </Ons.ListItem>
            )
        }
    }

    //render sidebar and toolbar
    render() {
        return (
            <Ons.Splitter>
                <Ons.SplitterSide side='right' width={'50%'} style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}} 
                    swipable={true} collapse={true} isOpen={this.state.isOpen} onClose={this.hide} onOpen={this.show}>
                    <Ons.Page>
                        <Ons.List dataSource={['Map', 'Picture', 'Settings']} renderRow={this.renderRow} renderHeader={() => <Ons.ListHeader>Mode</Ons.ListHeader>} />
                    </Ons.Page>
                </Ons.SplitterSide>
                <Ons.SplitterContent>
                <Ons.Page renderToolbar={this.renderToolbar}>
                    {this.props.children}
                </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
        )
    }
}

module.exports = {
    Main: Main
};