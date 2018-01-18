module.exports = (bundler) => {
    // Handle handlebars files
    bundler.addAssetType('hbs', require.resolve('./lib/HbsAsset'));
    bundler.addAssetType('handlebars', require.resolve('./lib/HbsAsset'));
}
