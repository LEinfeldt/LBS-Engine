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
        this.state = {
            name: config.app.name,
            logging: config.app.logging,
            externalData: config.app.externalData,
            gps: config.app.gps
        }
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
        config.app.name = e.target.value;
    }

    handleChangeLogging(e) {
        this.setState({logging: e.target.checked});
        config.app.logging = e.target.checked;
    }

    handleChangeData(e) {
        this.setState({externalData: e.target.checked});
        config.app.externalData = e.target.checked;
    }

    handleChangeGPS(e) {
        this.setState({gps: e.target.checked});
        config.app.gps = e.target.checked;
    }

    render() {
        <section style={{textAlign: 'center'}}>
            <Ons.Input 
                value={this.state.name} 
                placeholder='App name'
                modifier='underbar'
                float
                onChange={this.handleNameChange} />
            <Ons.Row>
                <p>Logging </p>
                <Ons.Switch 
                    checked={this.state.logging}
                    onChange={this.handleChangeLogging} />
            </Ons.Row>
            <Ons.Row>
                <p>External Data Sources </p>
                <Ons.Switch 
                    checked={this.state.externalData}
                    onChange={this.handleChangeData} />
            </Ons.Row>
            <Ons.Row>
                <p>GPS </p>
                <Ons.Switch 
                    checked={this.state.gps}
                    onChange={this.handleChangeGPS} />
            </Ons.Row>
        </section>
    }
}