var muzzley = require('muzzley-client');
var config = require('../config');

var SIGNALS = {
  BOOTSTRAP: 'nest_status'
};

var EVENTS = {
  ACTIVITY: {
    JOIN: 'participantJoin',
    QUIT: 'participantQuit'
  },
  PARTICIPANT: {
    QUIT: 'quit',
    MESSAGE: 'signalingMessage'
  }
};

function Wrapper(rig) {
  this.rig = rig;
}

Wrapper.prototype.manageActivity = function (activity) {
  var self = this;
  activity.on(EVENTS.ACTIVITY.JOIN, function (participant) { self.showProperWidget(participant); });
  activity.on(EVENTS.ACTIVITY.QUIT, function (participant) { self.logQuittingAction(participant); });
};

Wrapper.prototype.showProperWidget = function (participant) {
  var self = this;
  participant.changeWidget(config.muzzley.widget.type, config.muzzley.widget.properties, function () {
    self.bootstrapParticipantWidget(participant);
    self.manageParticipantEvents(participant);
  });
};

Wrapper.prototype.bootstrapParticipantWidget = function (participant) {
  var self = this;
  participant.sendSignal(SIGNALS.BOOTSTRAP, {
    nestTemperature: self.rig.getTemperature(),
    nestTemperatureType: self.rig.getScale()
  });
};

Wrapper.prototype.logQuittingAction = function (participant) {
  console.log('[INFO] participant ' + participant + ' has quit the Muzzley app.');
};

Wrapper.prototype.manageParticipantEvents = function (participant) {
  var self = this;
  participant.on(EVENTS.PARTICIPANT.QUIT, function () {
    self.logQuittingAction(participant);
  });
  participant.on(EVENTS.PARTICIPANT.MESSAGE, function (type, data, callback) {
    self.setRigTemperature(parseInt(data.newTemperatureValue, 10));
  });
};

Wrapper.prototype.setRigTemperature = function (temperature) {
  this.rig.setTemperature(temperature);
};

Wrapper.prototype.init = function (callback) {
  var self = this, options = { token: config.muzzley.token, activityId: config.muzzley.activity };
  muzzley.connectApp(options, function (err, activity) {
    if (err) return callback(err);
    return self.manageActivity(activity);
  });
};

exports = module.exports = {};
exports.create = function (rig) {
  return new Wrapper(rig);
};