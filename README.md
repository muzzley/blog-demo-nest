# Nest Interface
This is a sample Muzzley integration showcasing how you can control the temperature of your Nest thermostat via a smartphone, and most importantly, with an open source setup.

## Getting Started
If you want to follow along, and you probably should, otherwise, you would not be here, the first and only thing you need to do (besides installing [Node.js](//nodejs.org/) if you have not yet) is to download the source code or clone this repo. Of course, you will need to have a Nest device and account credentials to test the app against.

## Running the app
To tun the app, open the `config.js` file in the `app` folder and replace the dummy content in the `username` and `password` string fields with your account credentials.

```javascript
module.exports = {
  nest: {
    username: process.env.NEST_USERNAME || 'yourNestUsername',
    password: process.env.NEST_PASSWORD || 'yourNestPassword'
  },
  ...
};
```

## How does it work?
As of today, there is no official Nest API but there are some libraries out there that provide access to its basic features such as [unofficial-nodejs-nest](https://www.npmjs.org/package/unofficial-nest-api), which is the one used by the app. The communication protocol with your Smartphone is established via the muzzley platform using the official Node.js [library](http://www.muzzley.com/documentation/libraries/nodejs.html). The integration boils down to the following flow:

### Widget
```javascript
// Display temperature updates on the widget
muzzley.on('nest_status', function (data, callback) {
  // update the UI using the data.nestTemperature property received
});

// Change the thermostat temperature with the value inserted using the widget.
muzzley.send("nest_setTemperature", { newTemperatureValue: 20 } );
```

### Node App
```javascript
muzzley.connectApp({ /* properties */ }, function (err, activity) {
  activity.on('participantJoin', function (participant) {
    participant.on('signalingMessage', function (type, data) {
      // Set data.newTemperatureValue as the device temperature using the unofficial-nodejs-nest API
    });
    ...
    // Send the current device temperature to the widget.
    participant.sendSignal('nest_status', { nestTemperature: 20 });
  });
});
```

## Next Steps
You can leverage this kind of integration to do a lot more stuff, not only specific to the Nest device (set home/away profiles, check humidity levels, etc.) but also with any kind of connected device that provides some kind of API or communication protocol. The widget is also fully customizable, so, if you want, you can create your own widgets on our [website](//www.muzzley.com) and use them instead. It's really easy to setup, you just need to change the `uuid` field in the `config.js` file:

```javascript
  muzzley: {
    ...
    widget: {
      ...
      properties: {
        uuid: process.env.MUZZLEY_NEST_WIDGET_ID || 'yourWidgetUUID',
        ...
      }
    }
  }
```

You can also create your own app and the corresponding static activity Id, but you won't need to do that as far as this example goes.

<br />

> Nest API credits to [unofficial-nodejs-nest](//github.com/wiredprairie/unofficial_nodejs_nest)

<br />

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/taniarocha/muzzley-nest/trend.png)](https://bitdeli.com/free" Bitdeli Badge")

