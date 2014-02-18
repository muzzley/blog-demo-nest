function Thermostat() {
  this.id = null;
  this.temperature = null;
  this.scale = null;
}

Thermostat.prototype.getId = function () {
  return this.id;
};

Thermostat.prototype.setId = function (id) {
  this.id = id;
};

Thermostat.prototype.getTemperature = function () {
  return this.temperature;
};

Thermostat.prototype.setTemperature = function (temperature) {
  this.temperature = temperature;
};

Thermostat.prototype.getScale = function () {
  return this.scale;
};

Thermostat.prototype.setScale = function (scale) {
  this.scale = scale;
};

Thermostat.prototype.toString = function () {
  return 'The Nest device #' + this.id + ' has a current temperature of ' + Math.floor(this.temperature) + ' ' + this.scale;
};

exports = module.exports = {};
exports.create = function () {
  return new Thermostat();
};