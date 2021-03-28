const { API_BASE_URL } = require('../constants');
const sample = require('../samples/sample_pin');
const FormData = require('form-data');
const request = require('request');

const perform = async (z, bundle) => {
  const { file, filename } = bundle.inputData;
  const formData = new FormData();

  // file will in fact be an url where the file data can be downloaded from
  // which we do via a stream created by NPM's request package
  // (form-data doesn't play nicely with z.request)
  formData.append('file', request(file), filename ? filename : 'zapier_file');

  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/pinning/pinFileToIPFS`,
    body: formData,
  });

  return { ...response.json, GatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.json.IpfsHash}`};
};

module.exports = {
  key: 'pin_file',
  noun: 'File',

  display: {
    label: 'Pin File',
    description: 'Pins a file to Pinata.',
  },

  operation: {
    perform,
    inputFields: [
        {
          key: 'file',
          type: 'file',
          label: 'File',
          required: true,
        },
        {
          key: 'filename',
          label: 'Filename',
        }
      ],
    sample,
  },
};
