var _ = require('lodash');

function Message(msg) {

    if(!msg)
        msg = {};

    if(!(this instanceof Message))
        return new Message(msg);

    this.data = this.data || {};
    this.registration_ids = this.registration_ids || [];
    this.collapse_key = this.collapse_key || null;
    this.delay_while_idle = this.delay_while_idle || null;
    this.time_to_live = this.time_to_live || null;
    this.dry_run = this.dry_run || null;
}


Message.prototype.addNew_Data = function(key, val) {
    this.data[key] = val;
}


Message.prototype.addNew_DataObject = function(dataObj) {
    if(typeof dataObj === 'object')
        this.data = _.assign(this.data, dataObj);
}


Message.prototype.addNew_RegistrationId = function(newId) {
    this.registration_ids.push(newId);
}


module.exports = Message;
