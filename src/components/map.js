'use strict';
const React = require('react');
const leaflet = require('react-leaflet');
const config = require('../../www/config/config.json');
const layers = require('../../www/config/layers.json');

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.addLayer = this.addLayer.bind(this);
        this.renderMapWithLayers = this.renderMapWithLayers.bind(this);
        //get the settings from the config file
        this.state = {
            position: config.map.center,
            zoom: config.map.zoom
        }
    }

    //get the elements from the layer.json file and add each layer with a layercontrol.Overlay to the map
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

    renderMapWithLayers() {
        return (
            <leaflet.Map center={this.state.position} zoom={this.state.zoom} dragging={this.props.draggable} zoomControl={this.props.zoomable} scrollWheelZoom={this.props.zoomable} zoomDelta={this.props.zoomable == false ? 0 : 1 }>
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

    //render the map with the layerControl
    render() {
        //if the layerControl is active, the map is rendered with the layercontrol
        if(this.props.layerControl) {
            return this.renderMapWithLayers()
        }
        else {
            //return the map without any layers shown
            return (
                <leaflet.Map center={this.state.position} zoom={this.state.zoom} dragging={this.props.draggable} zoomControl={this.props.zoomable} scrollWheelZoom={this.props.zoomable} zoomDelta={this.props.zoomable == false ? 0 : 1 }>
                    <leaflet.TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </leaflet.Map>
            )
        }
    }
}

module.exports = {
    Map: Map
}