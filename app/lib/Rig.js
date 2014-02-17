var nest = require('unofficial-nest-api');
var config = require('../config');

var Thermostat = require('./Thermostat');

function Rig() {
  this.units = [];
}

Rig.prototype.init = function (callback) {
  var self = this;

  function mapDevices(data) {
    for (var deviceId in data.device) {
      var unit = Thermostat.create();
      unit.setId(deviceId);
      unit.setTemperature(data.shared[deviceId].target_temperature);
      unit.setScale(data.device[deviceId].temperature_scale);
      self.units.push(unit);
    }
    return callback();
  }

  nest.login(config.nest.username, config.nest.password, function (err) {
    if (err) return callback(err);
    nest.fetchStatus(mapDevices);
  });
};

Rig.prototype.setTemperature = function (temperature) {
  for (var i = 0, len = this.units.length; i < len; i++) {
    this.units[i].setTemperature(temperature);
    nest.setTemperature(this.units[i].getId(), temperature);
  }
};

Rig.prototype.getTemperature = function () {
  var i = 0, len = this.units.length, total = 0;

  for (i = 0; i < len; i++) {
    total += this.units[i].getTemperature();
  }

  return Math.floor(total / len);
};

Rig.prototype.getScale = function () {
  var len = this.units.length;

  if (len === 0) {
    return null;
  }

  return this.units[0].getScale();
};

Rig.prototype.getUnits = function () {
  return this.units;
};

exports = module.exports = {};
exports.create = function () {
  return new Rig();
};