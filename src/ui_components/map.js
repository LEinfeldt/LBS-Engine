'use strict';
const React = require('react');
const leaflet = require('react-leaflet');
//custom files required
//data
const config = require('../data_components/config.json');
const layers = require('../data_components/layers.json');
//logic
const locationManager = require('../business_components/locationManager.js');

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.addLayers = this.addLayers.bind(this);
        this.renderMapWithLayers = this.renderMapWithLayers.bind(this);
        //get the settings from the config file
        this.state = {
            position: config.map.center,
            zoom: config.map.zoom,
            hasLocation: false
        }
        //marker symbol for the "you are here" marker
        this.positionMarker = L.icon({
            iconUrl: 'img/man.png',
            iconSize: [50, 50],
            iconAnchor: [25, 48],
            popupAnchor: [-3, -76]
        });
    }

    /**
     * Insert the gps location of the user into the map, if the gps-setting is true.
     */
    componentDidMount() {
        var that = this;
        locationManager.getLocation().then(function success(position) {
            var pos = [];
            pos.push(position.latitude);
            pos.push(position.longitude);
            if(that.props.gps) {
                that.setState({
                    position: pos,
                    hasLocation: true
                });
            }
        })
    }

    //get the elements from the layer.json file and add each layer with a layercontrol.Overlay to the map
    addLayers() {
        var mapLayers = [];
        for (let layer in layers) {
            var layerElement = [];
            //check if the layer is containing markers and add those
            if (layers[layer].type == 'marker') {
                for (var i = 0; i < layers[layer].items.length; i++) {
                    layerElement.push(<leaflet.Marker position={layers[layer].items[i].coords} key={layers[layer].items[i].name} />)
                }
            }
            //else it is a route
            else if (layers[layer].type == 'route') {
                layerElement.push(<leaflet.Polyline positions={layers[layer].coords} color='red' key={layers[layer].name} />);
            }
            mapLayers.push(<leaflet.LayersControl.Overlay key={layer} name={layer} checked={true}><leaflet.LayerGroup key={layer}>{layerElement}</leaflet.LayerGroup></leaflet.LayersControl.Overlay>)
        }
        return mapLayers;
    }

    renderMapWithLayers() {
        //check if the location is enabled and available
        const marker = this.state.hasLocation && this.props.gps
            ? (
                <leaflet.Marker position={this.state.position} icon={this.positionMarker} />
            )
            : null;
        return (
            <leaflet.Map
                center={this.state.position}
                zoom={this.state.zoom}
                dragging={this.props.draggable}
                zoomControl={this.props.zoomable}
                scrollWheelZoom={this.props.zoomable}
                zoomDelta={this.props.zoomable == false ? 0 : 1}>
                <leaflet.TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <leaflet.LayersControl position="topleft">
                    {this.addLayers()}
                </leaflet.LayersControl>
                {marker}
            </leaflet.Map>
        )
    }

    //render the map with the layerControl
    render() {
        //if the layerControl is active, the map is rendered with the layercontrol
        if (this.props.layerControl) {
            return this.renderMapWithLayers()
        }
        else {
            //check if the location is enabled and available
            const marker = this.state.hasLocation && this.props.gps
                ? (
                    <leaflet.Marker position={this.state.position} icon={this.positionMarker} />
                )
                : null;
            //return the map without any layers shown
            return (
                <leaflet.Map center={this.state.position}
                    zoom={this.state.zoom}
                    dragging={this.props.draggable}
                    zoomControl={this.props.zoomable}
                    scrollWheelZoom={this.props.zoomable}
                    zoomDelta={this.props.zoomable == false ? 0 : 1}>
                    <leaflet.TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="Map data &copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    {marker}
                </leaflet.Map>
            )
        }
    }
}

module.exports = {
    Map: Map
}