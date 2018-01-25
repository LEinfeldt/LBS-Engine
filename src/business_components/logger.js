'use strict';
const CordovaPromiseFS = require('cordova-promise-fs');

//setup for cordova promise fs
var fs = CordovaPromiseFS({
    persistent: true, // or false
    storageSize: 20*1024*1024, // storage size in bytes, default 20MB
    concurrency: 3,// how many concurrent uploads/downloads?
    Promise: require('bluebird') // Your favorite Promise/A+ library!
  });

/**
 * Check if there is already a file existing. If so, use it, else create one.
 */
function getFile() {

    //return a promise of the file, that is created or found
    return new Promise(function(resolve, reject) {
        //check for the file system ready
        fs.deviceready.then(function () {
            fs.exists('lbs-engine-logger.csv').then(function success(result) {
                //use the file that already exists
                if(result != false) resolve(result);
                //if there was no file, create a new one
                if(result == false) {    
                    fs.create('lbs-engine-logger.csv').then(function (result) {
                        //resolve the new created file entry in the promise
                        resolve(result);
                    }, function error(err) {
                        console.log(err);
                    });}
            }, function error(err) {
                console.log(err);
            })
        });
    });
};

/**
 * Write data into the logfile.
 * @param {JSON} data Data that shall be written into the logfile.
 */
function logEntry(data) {

    //get the file and write data into it
    getFile().then(function success(file) {
        console.log(file);
        //write data
        fs.write(file.fullPath, data).then(function success(value) {
            console.log('File successfully written');
        }, function error(err) {
            console.log('Error writing file: ' + err);
        });
    }, function error(err) {
        console.log(err);
    });
};



module.exports = {
    fs: fs,
    logEntry: logEntry
}