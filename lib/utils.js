const fs = require('fs');
const path = require('path');

function loadUserConfig() {
  const file = path.resolve(process.cwd(), 'handlebars.config.js');
  const flavors = [
    file, // handlebars.config.js
    file.replace('.js', '.json'), // handlebars.config.json
    file.replace('handlebars.', 'hbs.'), // hbs.config.js
    file.replace('handlebars.', 'hbs.').replace('.js', '.json'), // hbs.config.json
  ];

  if (fs.existsSync(flavors[0])) { // eslint-disable-line no-sync
    return require(flavors[0]); // eslint-disable-line global-require
  }

  if (fs.existsSync(flavors[1])) { // eslint-disable-line no-sync
    return JSON.parse(fs.readFileSync(flavors[1], { encoding: 'utf-8' })); // eslint-disable-line no-sync
  }

  if (fs.existsSync(flavors[2])) { // eslint-disable-line no-sync
    return require(flavors[2]); // eslint-disable-line global-require
  }

  if (fs.existsSync(flavors[3])) { // eslint-disable-line no-sync
    return JSON.parse(fs.readFileSync(flavors[3], { encoding: 'utf-8' })); // eslint-disable-line no-sync
  }

  return {};
}

const parseSimpleLayout = (str, opts) => {
  const layoutPattern = /{{!<\s+([A-Za-z0-9._\-/]+)\s*}}/;
  const matches = str.match(layoutPattern);

  if (matches) {
    let layout = matches[1];

    if (opts.layouts && layout[0] !== '.') {
      layout = path.resolve(opts.layouts, layout);
    }

    const hbsLayout = path.resolve(process.cwd(), `${layout}.hbs`);

    if (fs.existsSync(hbsLayout)) { // eslint-disable-line no-sync
      const content = fs.readFileSync(hbsLayout, { encoding: 'utf-8' }); // eslint-disable-line no-sync
      return content.replace('{{{body}}}', str);
    }

    const handlebarsLayout = hbsLayout.replace('.hbs', '.handlebars');

    if (fs.existsSync(handlebarsLayout)) { // eslint-disable-line no-sync
      const content = fs.readFileSync(handlebarsLayout, { encoding: 'utf-8' }); // eslint-disable-line no-sync
      return content.replace('{{{body}}}', str);
    }
  }

  return str;
};

module.exports = {
  loadUserConfig,
  parseSimpleLayout,
};
