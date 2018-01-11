'use strict';
const React = require('react');
const leaflet = require('react-leaflet');
const config = require('../../www/config/config.json');

class Map extends React.Component {

    constructor(props) {
        super(props);
        //get the settings from the config file
        this.state = {
            position: config.map.center,
            zoom: config.map.zoom,
            dragging: config.map.draggable,
            zoomable: config.map.zoomable
        }
    }

    render() {
        return (
            <leaflet.Map center={this.state.position} zoom={this.state.zoom} dragging={this.state.dragging} zoomControl={this.state.zoomable} scrollWheelZoom={this.state.zoomable} zoomDelta={this.state.zoomable == false ? 0 : 1 }>
                <leaflet.TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </leaflet.Map>
        )
    }
}

module.exports = {
    Map: Map
}