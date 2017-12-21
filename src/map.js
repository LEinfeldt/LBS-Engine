'use strict';
const React = require('react');
const leaflet = require('react-leaflet');
const config = require('./config.json');

//get the map pre-settings from the config file
const position = config.map.center;
const zoom = config.map.zoom;
const dragging = config.map.draggable;
const zoomable = config.map.zoomable;

const map = (
    <leaflet.Map center={position} zoom={zoom} dragging={dragging} zoomControl={zoomable} scrollWheelZoom={zoomable} zoomDelta={zoomable == false ? 0 : 1 }>
        <leaflet.TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
    </leaflet.Map>
);

module.exports = {
    Map: map
}