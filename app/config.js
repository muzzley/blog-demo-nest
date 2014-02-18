module.exports = {
  nest: {
    username: process.env.NEST_USERNAME || 'yourNestUsername',
    password: process.env.NEST_PASSWORD || 'yourNestPassword'
  },
  muzzley: {
    token: process.env.MUZZLEY_APP_TOKEN || '0f0fe92e15316d4b',
    activity: process.env.MUZZLEY_ACTIVITY_ID || '948035',
    widget: {
      type: process.env.MUZZLEY_NEST_WIDGET_TYPE || 'webview',
      properties: {
        uuid: process.env.MUZZLEY_NEST_WIDGET_ID || 'aef671a3-2a24-4b5f-8934-be763451df49',
        orientation: process.env.MUZZLEY_NEST_WIDGET_ORIENTATION || 'portrait'
      }
    }
  }
};