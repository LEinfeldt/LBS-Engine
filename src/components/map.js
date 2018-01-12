'use strict';
const React = require('react');
const leaflet = require('react-leaflet');
const config = require('../../www/config/config.json');
const layers = require('../../www/config/layers.json');

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.addLayer = this.addLayer.bind(this);
        //get the settings from the config file
        this.state = {
            position: config.map.center,
            zoom: config.map.zoom,
            dragging: config.map.draggable,
            zoomable: config.map.zoomable
        }
    }

    addLayer() {
        var mapLayers = [];
        for(let layer in layers) {
            var markers = [];
            for(var i = 0; i < layers[layer].items.length; i++) {
                markers.push(<leaflet.Marker position={layers[layer].items[i].coords} key={layers[layer].items[i].name}/>)
            }
            mapLayers.push(<leaflet.LayersControl.Overlay key={layer} name={layer} checked={true}><leaflet.LayerGroup key={layer}>{markers}</leaflet.LayerGroup></leaflet.LayersControl.Overlay>)
        }
        return mapLayers;
    }

    /**
     * Toggle the visibility of a layer specified in the param "index"
     * @param {String} layerName Name of the layer to be toggled
     */
    toggleLayer(layerName) {
        for(let layer in layers) {
            if(layer == layerName) {
                leaflet.LayersControl.Overlay.addLayer(layerName);
            }
        }
        
    }

    render() {
        return (
            <leaflet.Map center={this.state.position} zoom={this.state.zoom} dragging={this.state.dragging} zoomControl={this.state.zoomable} scrollWheelZoom={this.state.zoomable} zoomDelta={this.state.zoomable == false ? 0 : 1 }>
                <leaflet.TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <leaflet.LayersControl position="topleft">
                    {this.addLayer()}
                </leaflet.LayersControl>
            </leaflet.Map>
        )
    }
}

module.exports = {
    Map: Map
}