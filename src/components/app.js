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
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.getLayerNames = this.getLayerNames.bind(this);
        this.handleLoggingChange = this.handleLoggingChange.bind(this);
        this.handleExternalDataChange = this.handleExternalDataChange.bind(this);
        this.handleGpsChange =  this.handleGpsChange.bind(this);
        this.handleLayerControlChange = this.handleLayerControlChange.bind(this);
        this.handleZoomMapChange = this.handleZoomMapChange.bind(this);
        this.handleDragMapChange = this.handleDragMapChange.bind(this);
        this.layerNames = [];
        this.state = {
            isOpen: false,
            run: false,
            //elements used for lifted up state of the config file
            logging: config.app.logging,
            externalData: config.app.externalData,
            gps: config.app.gps,
            layerControl: config.app.layerControl,
            zoomable: config.map.draggable,
            draggable: config.map.zoomable
        }
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

    //disable the getLayerNames from running twice (bad hack)
    componentWillMount() {
        this.getLayerNames();
    }

    // get the names of the layers from the layer.json file to insert them into the list of layers
    getLayerNames() {
        if(!this.state.run) {
            for(var layer in layers) {
                this.layerNames.push(layer);
            }
            this.setState({run: true});
        }
        return this.layerNames;
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

    //insert rows into the sidebar, with image and name
    renderRow(title, index) {
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

    //render sidebars and toolbar
    render() {
        //clone the children to pass properties to them
        const {children} = this.props;
        //the properties are the adjustable values from the config file
        var childrenWithProps = React.Children.map(children, child => 
            React.cloneElement(child, {onLoggingChange: this.handleLoggingChange, onDataChange: this.handleExternalDataChange, onGpsChange: this.handleGpsChange,
                onLayerControlChange: this.handleLayerControlChange, onDragMapChange: this.handleDragMapChange, onZoomMapChange: this.handleZoomMapChange, 
                logging: this.state.logging, data: this.state.externalData, gps: this.state.gps, layerControl: this.state.layerControl, draggable: this.state.draggable,
                zoomable: this.state.zoomable}));
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
                    {childrenWithProps}
                </Ons.Page>
                </Ons.SplitterContent>
            </Ons.Splitter>
        )
    }
}

module.exports = {
    App: App
};