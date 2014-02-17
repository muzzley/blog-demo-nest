module.exports = {
  nest: {
    username: process.env.NEST_USERNAME || 'yourNestUsername',
    password: process.env.NEST_PASSWORD || 'yourNestPassword'
  },
  muzzley: {
    token: '0f0fe92e15316d4b',
    activity: '948035',
    widget: {
      type: 'webview',
      properties: {
        uuid: '8137001c-2711-4af3-a799-45003b6359aa',
        orientation: 'portrait'
      }
    }
  }
};