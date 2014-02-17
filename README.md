#Nest Interface

The Nest Interface allows you to control the Nest device with a custom interface.

<br>
To integrate with Nest there are no official api, but on github exists a unofficial api in node: [unofficial-nodejs-nest](https://github.com/wiredprairie/unofficial_nodejs_nest). 
Next you have to install and configure the Nest. In my case there was no possibility of doing the installation with the thermostat, but I could see the changes in the Nest display. Turn on your Nest and configure the settings, location, wi-fi, etc. Go to [home.nest.com](https://home.nest.com/) to configure your account and set on account settings of your Nest.
<br>After the Nest online and logged in, you are ready to clone the code of this project. 

### WIDGET 

Use the files of widget folder to create your own widget on [muzzley site](http://www.muzzley.com/)
<br>Pay attention on the muzzley events on the Javascript file. These events will receive and send messages to muzzley.


<pre><code>
	// loads initial values from Nest and Belkin
	muzzley.on('nest_status', function(data, callback){
		// data.nestTemperatureType	
		// data.nestTemperature
		// data.nestHumidity	
		// data.nestOnline	
		// data.nestAway	
		// data.nestOff	
		// data.nestId	
	});
	
	// change the temperature value to 20
	muzzley.send("nest_setTemperature", {newTemperatureValue: 20} );
	
	// change the away status to true
	muzzley.send("nest_setAway", {value: true} );

</code></pre>

The widget shows the Nest info and allows you to change the temperature of the Nest, and the away status.


###APLICATION

Go to muzzley-nest.js and change the `username` and `password` variables to you Nest account data.
The `widgetUuid`, `token` and `activityId` variables are filled with real data from [muzzley site](http://www.muzzley.com/), so you can immediately test the demo.

Installing packages:

<pre><code>npm install</code></pre>

On your shell:

<pre><code>node muzzley-nest.js</code></pre>
 


If all goes well Belkin and Nest devices is detected and the muzzley activity is created. 
Use your muzzley application and insert the activity id to connect and view the interface.

<br><br>


> Nest api credits to project ([ unofficial-nodejs-nest](https://github.com/wiredprairie/unofficial_nodejs_nest))


<br>
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/taniarocha/muzzley-nest/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

