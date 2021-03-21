const authentication = require('./authentication');
const middleware = require('./middleware');
const listPin = require('./triggers/list_pins');
const addMetadata = require('./creates/add_metadata');
const pinFile = require('./creates/create_file');

const App = {
  version: require('./package.json').version, // eslint-disable-line global-require
  platformVersion: require('zapier-platform-core').version, // eslint-disable-line global-require

  authentication,

  beforeRequest: [middleware.includeJWT],

  afterResponse: [middleware.handleErrors],

  resources: {},

  triggers: {
    [listPin.key]: listPin,
  },

  searches: {},

  creates: {
    [addMetadata.key]: addMetadata,
    [pinFile.key]: pinFile,
  },
};

module.exports = App;
