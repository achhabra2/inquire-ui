// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'Inquire',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
};
