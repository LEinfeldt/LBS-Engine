'use strict';

function getLocation() {
    
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(function success(position) {
            console.log("Current position: ", position);
            resolve(position.coords);
        }, function error(err) {
            console.log(err);
            reject(err);
        });
    })
}

module.exports = {
    getLocation: getLocation
}