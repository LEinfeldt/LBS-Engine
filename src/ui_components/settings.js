'use strict';

const React = require('react');
const Ons = require('react-onsenui');

//custom files
//logic
const logger = require('../business_components/logger.js');
const locationManager = require('../business_components/locationManager.js');


/**
 * Settings for the app. Modifys the state of the settings
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
        this.createLog = this.createLog.bind(this);
    }

    createLog(mode, change) {
        var action;
        if(this.props.logging) {
            //define the log
            if(change) {
                action =  'Activate ' + mode;
            }
            else action = 'Deactivate ' + mode;
            var entry;
            //get the current position for the log
            locationManager.getLocation().then(function success(position) {
                entry = [position.latitude, position.longitude, 'Settings', action];
                //log the data
                logger.logEntry(entry);
            }, function error(err) {
                //if there was an error getting the position, log a '-' for lat/lng
                entry = ['-', '-', 'Settigns', action];
                //log the data
                logger.logEntry(entry);
            })
        }
    }

    //handle toggle for logging
    handleChangeLogging(e) {
        this.props.onLoggingChange(e.target.checked);
        var action;
        //define the log
        if(e.target.checked) {
            action =  'Activate logging';
        }
        else action = 'Deactivate logging';
        var entry;
        //get the current position for the log
        locationManager.getLocation().then(function success(position) {
            entry = [position.latitude, position.longitude, 'Settings', action];
            //log the data
            logger.logEntry(entry);
        }, function error(err) {
            //if there was an error getting the position, log a '-' for lat/lng
            entry = ['-', '-', 'Settigns', action];
            //log the data
            logger.logEntry(entry);
        })
    }

    //handle toggle for using external data
    handleChangeData(e) {
        this.props.onDataChange(e.target.checked);
        this.createLog('external data', e.target.checked);
    }

    //handle toggle for using GPS
    handleChangeGPS(e) {
        this.props.onGpsChange(e.target.checked);
        this.createLog('GPS', e.target.checked);
    }

    //handle toggle for layerControl
    handleChangeLayerControl(e) {
        this.props.onLayerControlChange(e.target.checked);
        this.createLog('Layer Control', e.target.checked);
    }

    //handle toggle of map dragging 
    handleChangeDragMap(e) {
        this.props.onDragMapChange(e.target.checked);
        this.createLog('Map Dragging', e.target.checked);
    }

    //handle toggle of map zooming
    handleChangeZoomMap(e) {
        this.props.onZoomMapChange(e.target.checked);
        this.createLog('Map Zooming', e.target.checked);
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
                    <p>Drag map: </p>
                    <Ons.Switch 
                        checked={this.props.draggable}
                        onChange={this.handleChangeDragMap} />
                    <p>Zoom map: </p>
                    <Ons.Switch 
                        checked={this.props.zoomable}
                        onChange={this.handleChangeZoomMap} />
                    <p>Stop Logging and write File</p>
                    <Ons.Button onClick={logger.stopLoggingAndWriteFile}>Write Logfile</Ons.Button>
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