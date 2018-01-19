

# parcel-plugin-handlebars [![npm](https://img.shields.io/npm/v/parcel-plugin-handlebars.svg)](https://www.npmjs.com/package/parcel-plugin-handlebars)

[【What is Parcel】](https://parceljs.org/)[【What is Handlebars】](http://handlebarsjs.com/)

- [Install](#install)
- [Examples](#examples)
- [Configuration](#configuration)
- [Features](#features)
- [Contribute](#contribute)

## Install

> Using plugins in Parcel could not be any simpler. All you need to do is install them and save in your package.json. Plugins should be named with the prefix parcel-plugin-, e.g. parcel-plugin-foo. Any dependencies listed in package.json with this prefix will be automatically loaded during initialization.

Install with [npm](https://www.npmjs.com/):

```bash
$ npm install --save parcel-plugin-handlebars
```

Install with [yarn](https://yarnpkg.com):

```bash
$ yarn add parcel-plugin-handlebars
```

The plugin will process any templated handlebars file extensions (.hbs, .handlebars and .html)

## Examples

* [simple](https://github.com/TheBlackBolt/parcel-plugin-handlebars/tree/master/examples/simple)
* [advanced](https://github.com/TheBlackBolt/parcel-plugin-handlebars/tree/master/examples/advanced)

## Configuration

The plugin has the following config defaults. These are required for handlebars to map all dependencies for compiling handlebars templates.

```js
module.exports = {
  data: 'src/markup/data',
  decorators: 'src/markup/decorators',
  helpers: 'src/markup/helpers',
  layouts: 'src/markup/layouts',
  partials: 'src/markup/partials',
};
```

### Custom Configuration

If you would like to enforce your own folder structure simply create  `handlebars.config.js` or `hbs.config.js` in your project root.

```js
module.exports = {
  data: 'views/json',
  helpers: 'views/tools',
  layouts: 'views/templates',
  partials: 'views/partials',
};
```

## Features

### frontmatter
The plugin has built in support for frontmatter yaml. Processed yaml data will be passed into the templates before compilation. frontmatter yaml data will preferably be at the top of the template file such as the following example:

#### Source - `example.hbs`
```html
---
title: This is a heading
desc: this is a paragraph
names:
  - bob
  - jane
  - mark
---
{{!< mainlayout}}

<h1>{{title}}</h1>
<p>{{desc}}</p>
<ul>
{{#each names}}
  <li>{{this}}</li>
{{/each}}
</ul>
```

#### Output - `example.html`
```html
<html>
  <body>
    <h1>This is a heading</h1>
    <p>this is a paragraph</p>
    <ul>
      <li>bob</li>
      <li>jane</li>
      <li>mark</li>
    </ul>
  </body>
</html>
```

### Handlebars Layouts
The plugin has built in support for [handlebars-layouts](https://www.npmjs.com/package/handlebars-layouts). The [advanced example](https://github.com/TheBlackBolt/parcel-plugin-handlebars/tree/master/examples/advanced) shows how to take advantage of handlebars layouts.
Please refer to their documentation for more information.

### Handlebars Helpers
The plugin is also including all helpers found in the npm package [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers).
Please refer to their documentation for example usages.

### Environment Variables

During compililation the plugin will also pass the following variable(s) to the template:

- NODE_ENV

This can be useful when you want specific code to show up on production builds.

```html
{{#eq NODE_ENV "production"}}
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXX');</script>
<!-- End Google Tag Manager -->
{{/eq}}
```

Or perhaps the opposite

```html
{{#isnt NODE_ENV "production"}}
<span class="dev-banner sticky full">
  You're in DEVELOPMENT mode
</span>
{{/isnt}}
```
