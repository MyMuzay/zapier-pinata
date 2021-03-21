const { API_BASE_URL } = require('../constants');

const buildBodyForUpload = async (z, bundle) => {
  const { name, description, hash, attributes } = bundle.inputData;  

  const image = `https://gateway.pinata.cloud/ipfs/${hash}`;

  z.console.log('attributes: ', attributes);

  const attArray = Object.keys(attributes).map(function(key, index) {
    return { "trait_type": key, "value": attributes[key] };
  });

  z.console.log('attArray: ', attArray);


  return {
    name,
    description,
    image,
    attributes: attArray,
  };
};

const perform = async (z, bundle) => {
  const body = await buildBodyForUpload(z, bundle);

  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/pinning/pinJSONToIPFS`,
    body
  });
  return response.json;
};

module.exports = {
  key: 'pin_metadata',
  noun: 'Metadata',

  display: {
    label: 'Add Metadata to IPFS File',
    description: 'Add metadata and pin it to any file, or directory, on Pinata\'s IPFS nodes.',
  },

  operation: {
    perform,
    inputFields: [
      {
        key: 'hash',
        label: 'IPFS Hash',
        required: true,
        helpText: 'IPFS Hash to the NFT content`',
      },
      {
        key: 'name',
        label: 'Name',
        required: true,
        helpText: 'NFT Name',
      },
      {
        key: 'description',
        label: 'Description',
        helpText: 'Description of the NFT',
      },
      {
        key: 'attributes',
        dict: true,
        label: 'Attributes',
        helpText: 'List of details for the NFT.',
      },
      ],
    sample: {
      IpfsHash: 'QmNybufJtuvWCZ355HGejvKfUXK8VeLcPA5G7CxT9MXJJp',
      PinSize: 290,
      Timestamp: '2021-02-10T14:06:09.255Z'
    },
  },
};
