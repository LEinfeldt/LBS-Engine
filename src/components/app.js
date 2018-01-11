"use strict";

const React = require('react');
const Ons = require('react-onsenui');
const Link = require('react-router-dom').Link;

//custom files
const config = require('../../www/config/config.json');
const layers = require('../../www/config/layers.json');


/**
 * Main frame for the app.
 * Contains the Toolbar in the top and a sidebar to select the mode
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.showRight = this.showRight.bind(this);
        this.hideRight = this.hideRight.bind(this);
        this.hideLeft = this.hideLeft.bind(this);
        this.showLeft = this.showLeft.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.state = {
            isOpenRight: false,
            isOpenLeft: false
        }
    }

    //toolbar on top of the app, contains name of the app and the menu button
    renderToolbar() {
        if(config.app.layerControl) {
            return this.toolbarWithLayer();
        }
        return this.toolbarNoLayers();
    }

    //rendering the toolbar with the layers menu active
    toolbarWithLayer() {
        return (
            <Ons.Toolbar>
                <div className='center'>{config.app.name}</div>
                <div className='right'>
                    <Ons.ToolbarButton onClick={this.showRight}>
                        <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
                    </Ons.ToolbarButton>
                </div>
                <div className='left'>
                    <Ons.ToolbarButton onClick={this.showLeft}>
                        <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
                    </Ons.ToolbarButton>
                </div>
            </Ons.Toolbar>
        )
    }

    //render the toolbar with the layers menu disabled
    toolbarNoLayers() {
        return (
            <Ons.Toolbar>
                <div className='center'>{config.app.name}</div>
                <div className='right'>
                    <Ons.ToolbarButton onClick={this.showRight}>
                        <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
                    </Ons.ToolbarButton>
                </div>
            </Ons.Toolbar>
        )
    }

    //hide sidebar
    hideRight() {
        this.setState({isOpenRight: false});
    }

    //show sidebar
    showRight() {
        this.setState({isOpenRight: true});
    }

    //hide sidebar
    hideLeft() {
        this.setState({isOpenLeft: false});
    }

    //show sidebar
    showLeft() {
        this.setState({isOpenLeft: true});
    }

    //insert rows into the sidebar, with image and name
    renderRowRight(title, index) {
        if(index == 0) {
            return (
                <Link to='/' style={{ textDecoration: 'none' }} key={index}>
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
                </Link>
            )
        }
        else if(index == 1) {
            return (
                <Link to='/pictureView' style={{ textDecoration: 'none' }} key={index}>
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
                </Link>
            )
        }
        else {
            return (
                <Link to='/settings' style={{ textDecoration: 'none' }} key={index}>
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
                </Link>
            )
        }
    }

    renderRowLeft(title, index) {
        return (
            <Ons.ListItem 
                key={index} 
                tappable={true}>
                    <div className='center'>
                        {title}
                    </div>
            </Ons.ListItem>
        )
    }

    //render sidebar and toolbar
    render() {
        return (
            <Ons.Splitter>
                <Ons.SplitterSide side='right' width={'50%'} style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}} 
                    swipable={true} collapse={true} isOpen={this.state.isOpenRight} onClose={this.hideRight} onOpen={this.showRight}>
                    <Ons.Page>
                        <Ons.List dataSource={['Map', 'Picture', 'Settings']} renderRow={this.renderRowRight} renderHeader={() => <Ons.ListHeader>Mode</Ons.ListHeader>} />
                    </Ons.Page>
                </Ons.SplitterSide>
                <Ons.SplitterContent>
                <Ons.Page renderToolbar={this.renderToolbar}>
                    {this.props.children}
                </Ons.Page>
                </Ons.SplitterContent>
                <Ons.SplitterSide side='left' width={'50%'} style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}} 
                    swipable={true} collapse={true} isOpen={this.state.isOpenLeft} onClose={this.hideLeft} onOpen={this.showLeft}>
                    <Ons.Page>
                        <Ons.List dataSource={layers.layerNames} renderRow={this.renderRowLeft} renderHeader={() => <Ons.ListHeader>Layers</Ons.ListHeader>} />
                    </Ons.Page>
                </Ons.SplitterSide>
            </Ons.Splitter>
        )
    }
}

module.exports = {
    App: App
};