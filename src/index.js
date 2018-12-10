module.exports = function(bundler) {
    bundler.addAssetType('node', require.resolve('./NodeAsset'));
}