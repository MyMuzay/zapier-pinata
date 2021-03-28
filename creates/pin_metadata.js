const { API_BASE_URL } = require('../constants');
const sample = require('../samples/sample_pin');

const buildBodyForUpload = async (bundle) => {
  const { name, description, external_url, hash, attributes } = bundle.inputData;  

  const image = `https://gateway.pinata.cloud/ipfs/${hash}`;

  const attArray = Object.keys(attributes).map(function(key) {
    return { "trait_type": key, "value": attributes[key] };
  });

  return {
    name,
    description,
    image,
    external_url,
    attributes: attArray,
  };
};

const perform = async (z, bundle) => {
  const body = await buildBodyForUpload(bundle);

  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/pinning/pinJSONToIPFS`,
    body
  });
  return { ...response.json, GatewayUrl: `https://gateway.pinata.cloud/ipfs/${response.json.IpfsHash}`};
};

module.exports = {
  key: 'pin_metadata',
  noun: 'Metadata',

  display: {
    label: 'Pin NFT Metadata File',
    description: 'Add NFT metadata and pin it to any file, or directory, on Pinata\'s IPFS nodes.',
  },

  operation: {
    perform,
    inputFields: [
      {
        key: 'hash',
        label: 'IPFS Hash',
        required: true,
        helpText: 'IPFS Hash to the NFT content.',
      },
      {
        key: 'name',
        label: 'Name',
        required: true,
        helpText: 'Name of the NFT.',
      },
      {
        key: 'description',
        label: 'Description',
        helpText: 'Description of the NFT.',
      },
      {
        key: 'external_url',
        label: 'External URL',
        helpText: 'URL for where the original item lives.',
      },
      {
        key: 'attributes',
        dict: true,
        label: 'Attributes',
        helpText: 'List of details for the NFT.',
      },
      ],
    sample,
  },
};
