"use strict";

const React = require('react');
const Ons = require('react-onsenui');

//custom files
//data
const config = require('../data_components/config.json');
const layers = require('../data_components/layers.json');
//ui
const map = require('./map.js');
const pictureView =  require('./pictureView.js');
const settings = require('./settings.js');
const embededSite = require('./embededSite.js')
//logic
const locationManager = require('../business_components/locationManager.js');
const logger = require('../business_components/logger.js');


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
        this.handleClickAbout = this.handleClickAbout.bind(this);
        this.handleClickSettings = this.handleClickSettings.bind(this);
        this.handleClickHelp = this.handleClickHelp.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
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
    }

    componentDidMount() {
        document.addEventListener("pause", logger.stopLoggingAndWriteFile, false);
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

    /**
     * Handle the change of the parameter from the lower level
     * @param {Boolean} bool value of the change 
     */
    handleDragMapChange(bool) {
        this.setState({draggable: bool});
    }

    /**
     * Handle the change of the parameter from the lower level
     * @param {Boolean} bool value of the change 
     */
    handleZoomMapChange(bool) {
        this.setState({zoomable: bool});
    }


    //toolbar on top of the app, contains name of the app and the menu button
    renderToolbar() {
        const titles = ['About', 'Map', 'Streetview', 'Settings', 'Help'];
        return (
            <Ons.Toolbar>
                <div className='center'>{titles[this.state.index]}</div>
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

    //handle a click o settings --> change state
    handleClickSettings() {
        this.setState({index: 3});
    }

    //handle a click o about --> change state
    handleClickAbout() {
        this.setState({index: 0});
    }

    //handle a click o about --> change state
    handleClickHelp() {
        this.setState({index: 4});
    }

    /**
     * Render the tabs displayed in the bottom to select the mode
     * State components that are needed are handed over here from the state of this object.
     */
    renderTabs() {
        return [
            //Welcome page iframe 
            {
                content: <embededSite.EmbededComponent site='about.html' key='about' name='About' />,
                tab: <Ons.Tab label='About' icon='' key='about' style={{display: 'none'}}/>
            },
            //map element
            {
                content: <map.Map 
                                logging={this.state.logging} 
                                externalData={this.state.externalData} 
                                gps={this.state.gps} 
                                layerControl={this.state.layerControl}
                                draggable={this.state.draggable}  
                                zoomable={this.state.zoomable} 
                                key='map' />,
                tab: <Ons.Tab label='Map' icon='md-map' key='map' />
            },
            //pictureView element
            {
                content: <pictureView.PictureView 
                                logging={this.state.logging} 
                                externalData={this.state.externalData} 
                                gps={this.state.gps} 
                                layerControl={this.state.layerControl}
                                draggable={this.state.draggable}  
                                zoomable={this.state.zoomable} 
                                key='picture' />,
                tab: <Ons.Tab label='Streetview' icon='md-image' key='picture' />
            },
            //settings element, with no tab displayed in the tabbar, as it is accessible via the sidebar
            {
                content: <settings.Settings 
                                onLoggingChange={this.handleLoggingChange} 
                                onDataChange={this.handleExternalDataChange} 
                                onGpsChange={this.handleGpsChange}
                                onLayerControlChange={this.handleLayerControlChange} 
                                onDragMapChange={this.handleDragMapChange} 
                                onZoomMapChange={this.handleZoomMapChange}
                                logging={this.state.logging} 
                                externalData={this.state.externalData} 
                                gps={this.state.gps} 
                                layerControl={this.state.layerControl}
                                draggable={this.state.draggable} 
                                zoomable={this.state.zoomable} 
                                key='settings' />,
                tab: <Ons.Tab label='Settings' icon='md-settings' key='settings' style={{display: 'none'}}/>
            },
            //about page iframe 
            {
                content: <embededSite.EmbededComponent site='help.html' key='help' name='Help' />,
                tab: <Ons.Tab label='Help' icon='md-help' key='help' style={{display: 'none'}}/>
            },
            //ship  around an error in current onsen release
            //can be solved with an update of onsen/onsen react --> issue: https://github.com/OnsenUI/OnsenUI/issues/2307
            {
                content: <div key='placeholder' />,
                tab: null
            }
        ]
    }

    //render the list displayed in the sidebar
    renderList() {
        return (
            <Ons.List>
                <Ons.ListItem 
                    tappable={true}
                    onClick={this.handleClickAbout}>
                        <div className='left'>
                            <Ons.Icon icon='md-info'/>
                        </div>
                        <div className='center'>
                            About
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
                <Ons.ListItem 
                    tappable={true}
                    onClick={this.handleClickHelp}>
                        <div className='left'>
                            <Ons.Icon icon='md-help'/>
                        </div>
                        <div className='center'>
                            Help
                        </div>
                </Ons.ListItem>
            </Ons.List>
        )
    }

    //render sidebars and toolbar
    render() {

        return (
            <Ons.Splitter>
                <Ons.SplitterSide 
                    side='right' 
                    width={'50%'} 
                    style={{boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}
                    swipeable={false}
                    collapse={true}
                    isOpen={this.state.isOpen} 
                    onClose={this.hide} 
                    onOpen={this.show}>
                    <Ons.Page>
                        {this.renderList()}
                    </Ons.Page>
                </Ons.SplitterSide>
                <Ons.Page renderToolbar={this.renderToolbar}>
                    <Ons.Tabbar 
                        swipeable={false}
                        position='bottom'
                        index={this.state.index}
                        onPreChange={(event) => 
                            {
                                if(event.index != this.state.index) {
                                    //handle error in onsen ui, triggering the change event of the tabbar with the change event of the carousel
                                    if(event.target !== event.currentTarget) return;
                                    this.setState({index: event.index});
                                }
                                
                                //check if logging is enabled and create a log if so
                                if(this.state.logging) {
                                    var modeName;
                                    switch(event.index) {
                                        case 0: modeName = 'About'
                                            break;
                                        case 1: modeName = 'Map'
                                            break;
                                        case 2: modeName = 'Streetview'
                                            break;
                                        case 3: modeName = 'Settings'
                                            break;
                                        case 4: modeName = 'Help';
                                    }

                                    var entry;
                                    //get the current position for the log
                                    locationManager.getLocation().then(function success(position) {
                                        entry = [position.latitude, position.longitude, modeName, 'Changed View'];
                                        //log the data
                                        logger.logEntry(entry);
                                    }, function error(err) {
                                        //if there was an error getting the position, log a '-' for lat/lng
                                        entry = ['-', '-', modeName, 'Changed View'];
                                        //log the data
                                        logger.logEntry(entry);
                                    })
                                }
                            }}
                        renderTabs={this.renderTabs} />
                </Ons.Page>
            </Ons.Splitter>
        )
    }
}

module.exports = {
    App: App
};