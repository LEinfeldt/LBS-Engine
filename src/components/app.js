"use strict";

const React = require('react');
const Ons = require('react-onsenui');

//custom files
const config = require('../../www/config/config.json');
const layers = require('../../www/config/layers.json');
const map = require('./map.js');
const pictureView =  require('./pictureView.js');
const settings = require('./settings.js');


/**
 * Main frame for the app.
 * Contains the Toolbar in the top and a sidebar to select the mode
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
        this.handleExternalDataChange = this.handleExternalDataChange.bind(this);
        this.handleGpsChange =  this.handleGpsChange.bind(this);
        this.handleLayerControlChange = this.handleLayerControlChange.bind(this);
        this.handleZoomMapChange = this.handleZoomMapChange.bind(this);
        this.handleDragMapChange = this.handleDragMapChange.bind(this);
        this.handleClickMap = this.handleClickMap.bind(this);
        this.handleClickPicture = this.handleClickPicture.bind(this);
        this.handleClickSettings = this.handleClickSettings.bind(this);
        this.renderList = this.renderList.bind(this);
        this.state = {
            isOpen: false,
            //elements used for lifted up state of the config file
            logging: config.app.logging,
            externalData: config.app.externalData,
            gps: config.app.gps,
            layerControl: config.app.layerControl,
            zoomable: config.map.draggable,
            draggable: config.map.zoomable,
            index: 0
        };
        this.modes = ['Map', 'Picture', 'Settings'];
    }

    /**
     * Handle the change of the parameter from the lower level
     * @param {Boolean} bool value of the change 
     */
    handleLoggingChange(bool) {
        this.setState({logging: bool});
    }

    /**
     * Handle the change of the parameter from the lower level
     * @param {Boolean} bool value of the change 
     */
    handleExternalDataChange(bool) {
        this.setState({externalData: bool});
    }

    /**
     * Handle the change of the parameter from the lower level
     * @param {Boolean} bool value of the change 
     */
    handleGpsChange(bool) {
        this.setState({gps: bool});
    }

    /**
     * Handle the change of the parameter from the lower level
     * @param {Boolean} bool value of the change 
     */
    handleLayerControlChange(bool) {
        this.setState({layerControl: bool});
    }

    handleDragMapChange(bool) {
        this.setState({draggable: bool});
    }

    handleZoomMapChange(bool) {
        this.setState({zoomable: bool});
    }


    //toolbar on top of the app, contains name of the app and the menu button
    renderToolbar() {
        return (
            <Ons.Toolbar>
                <div className='center'>{config.app.name}</div>
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
    handleClickMap() {
        this.setState({index: 0});
    }
    handleClickPicture() {
        this.setState({index: 1});
    }
    handleClickSettings() {
        this.setState({index: 2});
    }

    renderList() {
        return (
            <Ons.List renderHeader={() => <Ons.ListHeader>Mode</Ons.ListHeader>} >
                <Ons.ListItem 
                    tappable={true}
                    onClick={this.handleClickMap}>
                    <div className='left'>
                        <Ons.Icon icon='md-map'/>
                    </div>
                    <div className='center'>
                        Map
                    </div>
                </Ons.ListItem>
                <Ons.ListItem 
                    tappable={true}
                    onClick={this.handleClickPicture}>
                        <div className='left'>
                            <Ons.Icon icon='md-image'/>
                        </div>
                        <div className='center'>
                            Picture
                        </div>
                </Ons.ListItem>
                <Ons.ListItem 
                    tappable={true}
                    onClick={this.handleClickSettings}>
                        <div className='left'>
                            <Ons.Icon icon='md-settings'/>
                        </div>
                        <div className='center'>
                            Settings
                        </div>
                </Ons.ListItem>
            </Ons.List>
        )
    }
    //render sidebars and toolbar
    render() {
        
        if(this.state.index == 0) {
            return (
                <Ons.Splitter>
                <Ons.SplitterSide side='right' width={'50%'} style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}} 
                    swipable={true} collapse={true} isOpen={this.state.isOpen} onClose={this.hide} onOpen={this.show}>
                    <Ons.Page>
                        {this.renderList()}
                    </Ons.Page>
                </Ons.SplitterSide>
                <Ons.SplitterContent>
                <Ons.Page renderToolbar={this.renderToolbar}>
                    <map.Map logging={this.state.logging} externalData={this.state.externalData} gps={this.state.gps} layerControl={this.state.layerControl}
                        draggable={this.state.draggable}  zoomable={this.state.zoomable} />
                </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
            )
        }
        else if(this.state.index == 1) {
            return (
                <Ons.Splitter>
                    <Ons.SplitterSide side='right' width={'50%'} style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}} 
                        swipable={true} collapse={true} isOpen={this.state.isOpen} onClose={this.hide} onOpen={this.show}>
                        <Ons.Page>
                           {this.renderList()}
                        </Ons.Page>
                    </Ons.SplitterSide>
                    <Ons.SplitterContent>
                    <Ons.Page renderToolbar={this.renderToolbar}>
                        <pictureView.PictureView logging={this.state.logging} externalData={this.state.externalData} gps={this.state.gps} layerControl={this.state.layerControl}
                            draggable={this.state.draggable}  zoomable={this.state.zoomable} />
                    </Ons.Page>
                    </Ons.SplitterContent>
                </Ons.Splitter>
            )
        }
        else {
            return (
                <Ons.Splitter>
                    <Ons.SplitterSide side='right' width={'50%'} style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}} 
                        swipable={true} collapse={true} isOpen={this.state.isOpen} onClose={this.hide} onOpen={this.show}>
                        <Ons.Page>
                            {this.renderList()}
                        </Ons.Page>
                    </Ons.SplitterSide>
                    <Ons.SplitterContent>
                    <Ons.Page renderToolbar={this.renderToolbar}>
                        <settings.Settings onLoggingChange={this.handleLoggingChange} onDataChange={this.handleExternalDataChange} onGpsChange={this.handleGpsChange}
                            onLayerControlChange={this.handleLayerControlChange} onDragMapChange={this.handleDragMapChange} onZoomMapChange={this.handleZoomMapChange}
                            logging={this.state.logging} externalData={this.state.externalData} gps={this.state.gps} layerControl={this.state.layerControl}
                            draggable={this.state.draggable} zoomable={this.state.zoomable}/>
                    </Ons.Page>
                    </Ons.SplitterContent>
                </Ons.Splitter>
            )
        }
    }
}

module.exports = {
    App: App
};