const frontMatter = require('front-matter');
const handlebars = require('handlebars');
const handlebarsWax = require('handlebars-wax');
const handlebarsLayouts = require('handlebars-layouts');
const handlebarsHelpersPackage = require('handlebars-helpers');
const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset');
const handlebarsHelpers = handlebarsHelpersPackage();
const render = require('posthtml-render');
const { loadUserConfig } = require('./utils');

// Config is derived from defaults overwritten by user config
const config = Object.assign({
  data: 'src/markup/data',
  decorators: 'src/markup/decorators',
  helpers: 'src/markup/helpers',
  layouts: 'src/markup/layouts',
  partials: 'src/markup/partials',
}, loadUserConfig());

class HbsAsset extends HTMLAsset {
  constructor(name, pkg, options) {
    super(name, pkg, options);

    this.wax = handlebarsWax(handlebars)
      .helpers(handlebarsLayouts)
      .helpers(handlebarsHelpers)
      .helpers(`${config.helpers}/**/*.js`)
      .data(`${config.data}/**/*.{json,js}`)
      .decorators(`${config.decorators}/**/*.js`)
      .partials(`${config.layouts}/**/*.{hbs,handlebars,js}`)
      .partials(`${config.partials}/**/*.{hbs,handlebars,js}`);
  }

  parse(code) {
    // Compile handlebars into HTML and assign it in class scope in order to access later
    const frontmatter = frontMatter(code);
    this.template = this.wax.compile(frontmatter.body)({
      frontmatter: frontmatter.attributes,
      NODE_ENV: process.env.NODE_ENV,
    });

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
