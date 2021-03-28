const authentication = require('./authentication');
const middleware = require('./middleware');
const newPin = require('./triggers/new_pins');
const pinMetadata = require('./creates/pin_metadata');
const pinFile = require('./creates/pin_file');

const App = {
  version: require('./package.json').version, // eslint-disable-line global-require
  platformVersion: require('zapier-platform-core').version, // eslint-disable-line global-require

  authentication,

  beforeRequest: [middleware.includeJWT],

  afterResponse: [middleware.handleErrors],

  resources: {},

  triggers: {
    [newPin.key]: newPin,
  },

  searches: {},

  creates: {
    [pinMetadata.key]: pinMetadata,
    [pinFile.key]: pinFile,
  },
};

module.exports = App;
