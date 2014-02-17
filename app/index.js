var Rig = require('./lib/Rig');

var instance = Rig.create();
instance.init(function (err) {
  if (err) {
    console.log('[ERROR]', err.message);
  } else {
    var units = instance.getUnits();
    units.forEach(function (unit) {
      console.log('[INFO]', unit.toString());
    });
  }
});