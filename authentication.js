const { API_BASE_URL } = require('./constants');

const test = async (z) => {
  const response = await z.request({
    method: 'GET',
    url: `${API_BASE_URL}/data/testAuthentication`,
    disableMiddlewareErrorChecking: true,
  });

  if (response.status !== 200) {
    throw new Error('Your API Key is invalid. Please try again.');
  }
  return response.json;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'jwt',
      label: 'JWT Token',
      required: true,
      type: 'string',
      helpText:
        'Visit your [API Keys](https://pinata.cloud/keys) page to generate your JWT Token.',
    },
  ],
  test,
};
