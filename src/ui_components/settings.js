'use strict';

const React = require('react');
const Ons = require('react-onsenui');

//custom files
const config = require('../data_components/config.json');

/**
 * Settings for the app. Modifys the state of the config.json 
 */
class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeLogging = this.handleChangeLogging.bind(this);
        this.handleChangeGPS = this.handleChangeGPS.bind(this);
        this.handleChangeLayerControl = this.handleChangeLayerControl.bind(this);
        this.handleChangeDragMap =  this.handleChangeDragMap.bind(this);
        this.handleChangeZoomMap = this.handleChangeZoomMap.bind(this);
    }

    //handle toggle for logging
    handleChangeLogging(e) {
        this.props.onLoggingChange(e.target.checked);
    }

    //handle toggle for using external data
    handleChangeData(e) {
        this.props.onDataChange(e.target.checked);
    }

    //handle toggle for using GPS
    handleChangeGPS(e) {
        this.props.onGpsChange(e.target.checked);
    }

    //handle toggle for layerControl
    handleChangeLayerControl(e) {
        this.props.onLayerControlChange(e.target.checked);
    }

    //handle toggle of map dragging 
    handleChangeDragMap(e) {
        this.props.onDragMapChange(e.target.checked);
    }

    //handle toggle of map zooming
    handleChangeZoomMap(e) {
        this.props.onZoomMapChange(e.target.checked);
    }

    render() {
        return (
            <div>
                <section style={{textAlign: 'center'}}>
                    <p>Logging: </p>
                    <Ons.Switch 
                        checked={this.props.logging}
                        onChange={this.handleChangeLogging} />
                    <p>External Data Sources: </p>
                    <Ons.Switch 
                        checked={this.props.externalData}
                        onChange={this.handleChangeData} />
                    <p>GPS: </p>
                    <Ons.Switch 
                        checked={this.props.gps}
                        onChange={this.handleChangeGPS} />
                    <p>Layer Control: </p>
                    <Ons.Switch 
                        checked={this.props.layerControl}
                        onChange={this.handleChangeLayerControl} />
                    <p>Dragging the map: </p>
                    <Ons.Switch 
                        checked={this.props.draggable}
                        onChange={this.handleChangeDragMap} />
                    <p>Zoom map: </p>
                    <Ons.Switch 
                        checked={this.props.zoomable}
                        onChange={this.handleChangeZoomMap} />
                </section>
            </div>
        )
    }
}

const settingsComponent = <Settings />

module.exports = {
    Settings: Settings,
    settingsComponent: settingsComponent
}