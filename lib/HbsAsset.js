const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const handlebarsWax = require('handlebars-wax');
const handlebarsLayouts = require('handlebars-layouts');
const handlebarsHelpersPackage = require('handlebars-helpers');
const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset');
const handlebarsHelpers = handlebarsHelpersPackage();
const render = require('posthtml-render');

let userConfig = {};

// load user config if available
if (fs.existsSync('./handlebars.config.js')) {
  userConfig = fs.readFileSync('./handlebars.config.js');
} else if (fs.existsSync('./handlebars.config.json')) {
  userConfig = JSON.parse(fs.readFileSync('./handlebars.config.json'));
}

// Config is derived from defaults overwritten by user config
const config = Object.assign({
  ext: 'hbs',
  data: 'src/markup/data',
  helpers: 'src/markup/helpers',
  layouts: 'src/markup/layouts',
  partials: 'src/markup/partials',
}, userConfig);

class HbsAsset extends HTMLAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options);

    // This needs to go here in order to catch new partials that get created
    this.wax = handlebarsWax(handlebars)
      .helpers(handlebarsLayouts)
      .helpers(handlebarsHelpers)
      .helpers(`${config.helpers}/**/*.js`)
      .data(`${config.data}/**/*.{json,js}`)
      .partials(`${config.layouts}/**/*.{${config.ext},js}`)
      .partials(`${config.partials}/**/*.{${config.ext},js}`);
  }

  parse(code) {
    // Compile handlebars into HTML and assign it in class scope in order to access later
    this.template = this.wax.compile(code)();

    // Return the compiled HTML
    return super.parse(this.template);
  }

  generate() {
    // get the raw template or the rendered asset if asset is not dirty
    const html = this.isAstDirty ? render(this.ast) : this.template;

    return {
      html,
    };
  }
}

module.exports = HbsAsset;
