const fs = require('fs');

function loadUserConfig() {
  if (fs.existsSync('./handlebars.config.js')) { // eslint-disable-line no-sync
    return fs.readFileSync('./handlebars.config.js'); // eslint-disable-line no-sync
  }

  if (fs.existsSync('./handlebars.config.json')) { // eslint-disable-line no-sync
    return JSON.parse(fs.readFileSync('./handlebars.config.json')); // eslint-disable-line no-sync
  }

  return {};
}

module.exports = loadUserConfig;
