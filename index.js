module.exports = bundler => {
  // process handlebars files by .hbs and .handlebars extensions
  bundler.addAssetType('hbs', require.resolve('./lib/HbsAsset'));
  bundler.addAssetType('handlebars', require.resolve('./lib/HbsAsset'));
  bundler.addAssetType('html', require.resolve('./lib/HbsAsset'));
};
