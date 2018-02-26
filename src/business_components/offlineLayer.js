'use strict';
const React = require('react');
const leaflet = require('react-leaflet');
const PropTypes = require('prop-types');
const TileLayerOffline = require('leaflet-offline');
const localforage = require('localforage');

// type LeafletElement = TileLayerOffline;
// type Props = { url: string } & {attribution: string};
var tilesDb;
var layer;

/**
 * Extended Tilelayer that allows to save the tiles locally for offline usage
 */
class OfflineLayer extends leaflet.GridLayer {

    constructor(props) {
        super(props);
        //tiles DB saving the files
        this.tilesDb = {
            getItem: function (key) {
                return localforage.getItem(key);
            },
        
            saveTiles: function (tileUrls) {
                var self = this;
        
                var promises = [];
        
                for (var i = 0; i < tileUrls.length; i++) {
                    var tileUrl = tileUrls[i];
        
                    (function (i, tileUrl) {
                        promises[i] = new Promise(function (resolve, reject) {
                            var request = new XMLHttpRequest();
                            request.open('GET', tileUrl.url, true);
                            request.responseType = 'blob';
                            request.onreadystatechange = function () {
                                if (request.readyState === XMLHttpRequest.DONE) {
                                    if (request.status === 200) {
                                        resolve(self._saveTile(tileUrl.key, request.response));
                                    } else {
                                        reject({
                                            status: request.status,
                                            statusText: request.statusText
                                        });
                                    }
                                }
                            };
                            request.send();
                        });
                    })(i, tileUrl);
                }
        
                return Promise.all(promises);
            },
        
            clear: function () {
                return localforage.clear();
            },
        
            _saveTile: function (key, value) {
                console.log('Saved: ' + key);
                return this._removeItem(key).then(function () {
                    return localforage.setItem(key, value);
                });
            },
        
            _removeItem: function (key) {
                return localforage.removeItem(key);
            }
        };
    }

    //create the custom layer
    createLeafletElement(props) {
        tilesDb = this.tilesDb;
        layer = new L.TileLayer.Offline(this.props.url, this.tilesDb, {
            attribution: this.props.attribution,
            crossOrigin: true
        });
        return layer;
    }

    updateLeafletElement(fromProps, toProps) {
        super.updateLeafletElement(fromProps, toProps)
        if (toProps.url !== fromProps.url) {
          this.leafletElement.setUrl(toProps.url)
        }
    }
}

/**
 * Controller for te offline tile layer. Allows saving and deleting tile files at certain zoom ranges.
 * With no limitation in zoom, the amount of data to save would be too large.
 */
class OfflineControl extends leaflet.MapControl {

    createLeafletElement(props) {
        return new L.control.offline(layer, tilesDb, {
            saveButtonHtml: '<i class="fa fa-download" aria-hidden="true"></i>',
            removeButtonHtml: '<i class="fa fa-trash" aria-hidden="true"></i>',
            confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
                if (window.confirm('Save ' + nTilesToSave + '?')) {
                    continueSaveTiles();
                }
            },
            confirmRemovalCallback: function (continueRemoveTiles) {
                if (window.confirm('Remove all the tiles?')) {
                    continueRemoveTiles();
                }
            },
            minZoom: 13,
            maxZoom: 19
        })
    }
}

module.exports = {
    OfflineLayer: OfflineLayer,
    OfflineControl: OfflineControl
};