'use strict';
var React = require('react');
var leaflet = require('react-leaflet');
var config = require('./config.json');

//get the map pre-settings from the config file
const position = config.map.center;
const zoom = config.map.zoom;

const map = (
    <leaflet.Map center={position} zoom={zoom}>
        <leaflet.TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
  </leaflet.Map>
);

module.exports = {
    Map: map
}