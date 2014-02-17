var nest = require('unofficial-nest-api');
var muzzley = require('muzzley-client');

var username = 'yourNestUser@example.com';
var password = 'yourNestPass';
var widgetUuid='8137001c-2711-4af3-a799-45003b6359aa';
var options = {
  token: '0f0fe92e15316d4b',
  activityId: '948035'
};

var deviceId = '';
var temperature = '';
var humidity = '';
var away = '';
var someid = '';
var off = '';
var online = '';
var temperatureType = '';


function connectMuzzley(){
  muzzley.connectApp(options, function(err, activity) {
    if (err) return console.log('err: ' + err);
    console.log(' - Activity created id: '+activity.activityId);
    
    connectNest();
    // Usually you'll want to show this Activity's QR code image
    // or its id so that muzzley users can join.
    // They are in the `activity.qrCodeUrl` and `activity.activityId`
    // properties respectively.

    activity.on('participantJoin', function(participant) {

      participant.changeWidget('webview', {uuid: widgetUuid, orientation: 'portrait'}, function(err) {
        if (err) return console.log('err: ' + err );

        participant.on('quit', function() {
          console.log('quit');
        });

        var state = 0;
        var id = '';
        
        // send to muzzley the object with Nest inicial information
        participant.sendSignal('nest_status',
          {
            nestTemperature: temperature,
            nestTemperatureType: temperatureType,
            nestHumidity: humidity,
            nestAway:away,
            nestId:deviceId,
            nestOff: off,
            nestOnline:online
          }
        );

        // received from muzzley, when participant change Nest 
        participant.on('signalingMessage', function(type, data, callback) {
         
          switch (type) {
              case 'nest_setTemperature':
                console.log('set temperature to '+data.newTemperatureValue + ' ' + deviceId);
                var newTemp = parseInt(data.newTemperatureValue, 10);
                setTemperature(newTemp, deviceId);
                break;
              case 'nest_setAway':
                console.log('set away to: '+data.value + ' ' + deviceId);
                setAway(data.value, deviceId);
                break;
          }
        });
      });
    });
  });
}



function connectNest(){
  nest.login(username, password, function (err, data) {
      if (err) return console.log(err.message);
      nest.fetchStatus(function (data) {
        for (var ddeviceId in data.device) {
          //console.log(data);
          // save the Nest inicial information
          deviceId = ddeviceId;
          
          if (data.device.hasOwnProperty(ddeviceId)) {
            var device = data.shared[ddeviceId];
            temperatureType = data.device[ddeviceId].temperature_scale;
            temperature = data.shared[ddeviceId].target_temperature;
            //the target temperature value is always in Celsius, convert to Fahrenheit if the temperature scale was in Fahrenheit 
            if(temperatureType === 'F'){
              temperature = nest.ctof(temperature);
            }
            temperature = parseInt(temperature, 10);
            humidity = data.device[ddeviceId].current_humidity;
            someid = data.link[ddeviceId].structure;
            someid = someid.substring(someid.indexOf('.')+1, someid.length);
            away = data.structure[someid].away;
            off = data.device[ddeviceId].switch_system_off;
            online = data.track[ddeviceId].online;
            
            console.log(' - Nest: '+deviceId+' temperature: '+temperature+' '+temperatureType);
            console.log(' - Humidity: '+humidity+' away: '+away+' off: '+off+' online: '+online);
          }
          if(online){
            // when find one Nest online, return. In this example only want one Nest device
            return;
          }
          
        }
      });
  });
}

function setTemperature(temp, deviceId){
  if(temperature != temp){
    nest.login(username, password, function (err, data) {
      if (err) return console.log(err.message);
        nest.fetchStatus(function (data) {
          for (var ddeviceId in data.device) {
            if (data.device.hasOwnProperty(ddeviceId)) {
                if(ddeviceId === deviceId){
                  nest.setTemperature(ddeviceId, temp);
                }
            }
          }
        });
    });
  }
  temperature = temp;
}

function setAway(value, deviceId){
  if(away != value){
    nest.login(username, password, function (err, data) {
      if (err) return console.log(err.message);
        nest.fetchStatus(function (data) {
          for (var ddeviceId in data.device) {
            if (data.device.hasOwnProperty(ddeviceId)) {
                if(ddeviceId === deviceId){
                  if(value){
                    nest.setAway();
                  }else{
                    nest.setHome();
                  }
                }
            }
          }
        });
    });
  }
  away = value;
}