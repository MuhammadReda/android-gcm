# Android GCM Client for Node.js

A simple interface for Google Cloud Messaging (GCM) in Node.js


## Installation
```bash
npm install android-gcm
```

## Usage

Simplest Usage
```js
var gcm = require('android-gcm');

// initialize new androidGcm object
var gcmObject = new gcm.androidGcm('API_KEY');

// create new message
var message = new gcm.Message({
    registration_ids: ['x', 'y', 'z'],
    data: {
        key1: 'key 1',
        key2: 'key 2'
    }
});

// send the message
gcmObject.send(message, function(err, response) {});

```
