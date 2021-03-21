const { API_BASE_URL } = require('../constants');
const FormData = require('form-data');
const request = require('request');


const perform = async (z, bundle) => {
  const formData = new FormData();

  // file will in fact be an url where the file data can be downloaded from
  // which we do via a stream created by NPM's request package
  // (form-data doesn't play nicely with z.request)
  formData.append('file', request(bundle.inputData.file));


  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/pinning/pinFileToIPFS`,
    body: formData,
  });
  return { ...response.json, test_url: `https://gateway.pinata.cloud/ipfs/${response.json.IpfsHash}`};
};

module.exports = {
  key: 'create_file',
  noun: 'File',

  display: {
    label: 'Pin File',
    description: 'Pins a file to IPFS.',
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
      ],
    sample: {
      IpfsHash: 'QmNybufJtuvWCZ355HGejvKfUXK8VeLcPA5G7CxT9MXJJp',
      PinSize: 290,
      Timestamp: '2021-02-10T14:06:09.255Z'
    },  },
};
