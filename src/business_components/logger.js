'use strict';
const CordovaPromiseFS = require('cordova-promise-fs');

//global logging object
var logObject = [];
//set this to check for the first run of the log-method
var first = true;

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
 * Write data into the logObject.
 * @param {JSON} data Data that shall be written into the logObject.
 */
function logEntry(data) {

    //header for the csv-file in the end
    const header = ['Date/Time', 'Latitide', 'Longitude', 'Mode', 'Action'];
    var date = new Date().toString();

    //write this on the first log
    if (first) {
        first = false;

        //write the column names into the log object
        for(var i in header) {
            logObject.push(header[i]);
            console.log(header[i]);
        }
        logObject.push('\n');
        logObject.push(date);
        //then push the provided data into the columns
        for(var i in data) {
            logObject.push(data[i]);
            console.log(data[i]);
        }
        logObject.push('\n');
    }
    else {
        //set the date
        logObject.push(date);
        //else push only the data without the header
        for(var i in data) {
            logObject.push(data[i]);
            console.log(data[i]);
        }
        logObject.push('\n');
    }
};

/**
 * Get a logfile and write the whole logObject into the file
 */
function stopLoggingAndWriteFile() {

    //create a String that can be written into the file
    var writeData = '';

    //concatenate all the objects
    for(var i in logObject) {
        //if there is a \n in the file (which is inserted after every entry) a linebreak without a "," is inserted
        if(logObject[i] == '\n') {
            writeData += logObject[i];
        }
        //else just the data with a ","
        else {
            writeData += logObject[i] + ", ";
        }
    }
    
    //get the file and write data into it
    getFile().then(function success(file) {
        console.log(file);
        //write data
        fs.write(file.fullPath, writeData).then(function success(value) {
            console.log('File successfully written');
        }, function error(err) {
            console.log('Error writing file: ' + err);
        });
    }, function error(err) {
        console.log(err);
    });
}

module.exports = {
    logEntry: logEntry,
    stopLoggingAndWriteFile: stopLoggingAndWriteFile
}