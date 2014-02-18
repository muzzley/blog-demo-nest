window.NEST_DEMO = window.NEST_DEMO || {};
window.NEST_DEMO.DEVICE_PROPERTIES = window.NEST_DEMO.DEVICE_PROPERTIES || {
  TEMPERATURE: {
    MIN: 9,
    MAX: 32
  }
};
window.NEST_DEMO.MUZZLEY_PROPERTIES = window.NEST_DEMO.MUZZLEY_PROPERTIES || {
  INBOUND_SIGNAL: 'nest_status',
  OUTBOUND_SIGNAL: 'nest_setTemperature'
};

function addSelectFieldOptions(elem) {
  var optionSelector;
  for (var i = window.NEST_DEMO.DEVICE_PROPERTIES.TEMPERATURE.MIN; i <= window.NEST_DEMO.DEVICE_PROPERTIES.TEMPERATURE.MAX; i++) {
    optionSelector = $('<option value="' + i + '">' + i + '</option>');
    $('#temperature-input').append(optionSelector);
  }
}

function updateTemperatureOnWidget(temperature) {
  $('#temperature-input').val(temperature);
}

function updateTemperatureOnThermostat(temperature) {
  muzzley.send(window.NEST_DEMO.MUZZLEY_PROPERTIES.OUTBOUND_SIGNAL, { newTemperatureValue: temperature });
}

function manageDeviceEvents() {
  $('#temperature-input').on('change', function () {
    var currentTemperature = $(this).val();
    updateTemperatureOnThermostat(currentTemperature);
  });
}

function manageThermostatEvents() {
  muzzley.on(window.NEST_DEMO.MUZZLEY_PROPERTIES.INBOUND_SIGNAL, function (data) {
    updateTemperatureOnWidget(data.nestTemperature);
  });
}

$(function () {
  addSelectFieldOptions();
  manageDeviceEvents();
  manageThermostatEvents();
});