'use strict';

const React = require('react');
const Ons = require('react-onsenui');

//custom files
const config = require('../config.json');

/**
 * Settings for the app. Modifys the state of the config.json 
 */
class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleChangeLogging = this.handleChangeLogging.bind(this);
        this.handleChangeGPS = this.handleChangeGPS.bind(this);
        this.state = {
            logging: config.app.logging,
            externalData: config.app.externalData,
            gps: config.app.gps
        }
    }

    handleChangeLogging(e) {
        this.setState({logging: e.target.checked});
    }

    handleChangeData(e) {
        this.setState({externalData: e.target.checked});
    }

    handleChangeGPS(e) {
        this.setState({gps: e.target.checked});
    }

    render() {
        return (
            <div>
                <section style={{textAlign: 'center'}}>
                    <p>Logging: </p>
                    <Ons.Switch 
                        checked={this.state.logging}
                        onChange={this.handleChangeLogging} />
                    <p>External Data Sources: </p>
                    <Ons.Switch 
                        checked={this.state.externalData}
                        onChange={this.handleChangeData} />
                    <p>GPS: </p>
                    <Ons.Switch 
                        checked={this.state.gps}
                        onChange={this.handleChangeGPS} />
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