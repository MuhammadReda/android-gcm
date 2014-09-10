var https = require('https');
var util = require('util');
var events = require('events');


var apiKey = 'AIzaSyDDB-EmUH_OWjPJru9Fgro52puf6k6C-eg';
var nodeGCM = {};
util.inherits(nodeGCM, events.EventEmitter);


var x = 'APA91bHyel_7_H6nU1NaAekU9r8oujTuatAkzSuqvE4Ga_km1MqlbvPx1aJPgs6uruPohY1aOZobehZQmbbuiNSCJqtiltyWzQ3Cfr6My5deZvEA2gSaRafQNl0dBgIdLTBVCYVFpALDqL6Ubwf_ffr-OfJHxAHB0Q';
var y = 'APA91bG1ghYAe87BD_8iKKHY8gtNZntaKkT9pohTTaNtOJPCOgk6FcJtxpzFGdpTfjyl473GaZ4UvZJvT1Lf5bVShC-qsgniGql-Iea1y33MdoM_XNnKQHhEMCo2vpqnqhdrmRzs0-3XzpwuobRYiXJT77Xu939BVw';

var message = {
    'registration_ids': [
        x,
        y,
        'HELLO_YOU'
    ],
//    registration_id: x,
};
var postData = JSON.stringify(message);
console.log(postData);

var httpServer = {
    host: 'android.googleapis.com',
    path: '/gcm/send',
    port: 443,
    method: 'POST',
    headers: {}
};
var httpHeaders = {
    'Host': httpServer.host,
    'Authorization': 'key=' + apiKey,
    'Content-Type': 'application/json;charset=UTF-8',
    'Content-length': postData.length
};

httpServer.headers = httpHeaders;


var request = https.request(httpServer, function(response) {
    var data = '';

    response.on('data', function(d) {
        data += d;
    });

    response.on('end', function() {
        data = JSON.parse(data);
        console.log(data);
        console.log('Request ended!');
    });
});

request.on('error', function(error) {
    console.log('Error making request to server!', error);
});

request.write(postData);
request.end();

//console.log(request);

