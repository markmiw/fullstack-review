const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username) => {
  let url = 'https://api.github.com/users/'+username+'/repos';
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    }
  };

  let res = axios.get(url, options.headers);
  return res;
};

module.exports.getReposByUsername = getReposByUsername;