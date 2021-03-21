const { API_BASE_URL } = require('../constants');
const sample  = require('../samples/sample_pin');

const perform = async (z) => {
  const response = await z.request({
    method: 'GET',
    url: `${API_BASE_URL}/data/pinList`,
  });
  return response.json.rows ? response.json.rows : response.json;
};

module.exports = {
  key: 'list_pins',
  noun: 'Pin',

  display: {
    label: 'New Pin',
    description: 'Triggers when you have a new pinned file.',
  },

  operation: {
    perform,
    sample,
  },
};
