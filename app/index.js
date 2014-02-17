var config = require('./config');

var Rig = require('./lib/Rig');
var Wrapper = require('./lib/Wrapper');


var deviceRig = Rig.create();
var muzzleyWrapper = Wrapper.create(deviceRig);

function bootstrapDeviceRig(callback) {
  deviceRig.init(function (err) {
    if (err) return callback(err);
    return callback();
  });
}

function bootstrapMuzzleyApp(callback) {
  muzzleyWrapper.init(function (err) {
    if (err) return callback(err);
    return callback();
  });
}

bootstrapDeviceRig(function (err) {
  if (err) {
    console.log('[ERROR]', err.message);
  } else {
    var units = deviceRig.getUnits();

    console.log('[INFO] List of detected devices:');
    for (var i = 0, len = units.length; i < len; i++) {
      console.log('[INFO]', units[i].toString());
    }

    console.log('[INFO] Start the Muzzley app with the following key: ' + config.muzzley.activity);
    console.log('[INFO] Waiting for participants to join the activity...');
    bootstrapMuzzleyApp(function (err) {
      if (err) { console.log('[ERROR]', err.message); }
    });
  }
});