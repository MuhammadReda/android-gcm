var debug = require('debug')('https');
var https = require('https');
var util = require('util');
var events = require('events');

var Message = require('./message');


var androidGcm = function(androidApiKey) {

    if(androidApiKey)
        this.apikey = androidApiKey;
    else
        throw Error('Error. No API key.');

    if(!(this instanceof androidGcm))
        return new androidGcm(androidApiKey);

    this.httpServer = {
        host: 'android.googleapis.com',
        path: '/gcm/send',
        port: 443,
        method: 'POST',
        headers: {}
    };
}

util.inherits(androidGcm, events.EventEmitter);


androidGcm.prototype.send = function(message, cb) {

    var dataToPost = JSON.stringify(message);
    var _slef = this;

    _slef.httpServer.headers = {
        'Host': _slef.httpServer.host,
        'Authorization': 'key=' + _slef.apikey,
        'Content-Type': 'application/json;charset=UTF-8',
        'Content-length': Buffer.byteLength(dataToPost, 'utf8')
    };

    var request = https.request(_slef.httpServer, function(response) {

        var data = '';
        var _statusCode = response.statusCode;

        if(_statusCode === 400) {
            debug('400. Request could not be parsed as JSON, or it contained invalid fields.');
            return cb(_statusCode, null);
        }
        else if(_statusCode === 401) {
            debug('401. Error authenticating the sender account');
            return cb(_statusCode, null);
        }
        else if(_statusCode >= 500) {
            debug(_statusCode + '. Error in the GCM server while trying to process the request, or that the server is temporarily unavailable.');
            return cb(_statusCode, null);
        }
        else if(_statusCode !== 200) {
            debug(_statusCode + '. Request Error');
            return cb(_statusCode, null);
        }


        response.on('data', function(d) {
            data += d;
        });

        response.on('end', function() {
            data = JSON.parse(data);
            cb(null, data);
        });
    });

    request.on('error', function(err) {
        console.log('request error:  ', err);
    });

    request.write(dataToPost);
    request.end();
};

exports.androidGcm = androidGcm;
exports.Message = Message;
