const { Asset } = require('parcel-bundler');
const path = require('path');
const URL = require('url');

class NodeAsset extends Asset {
    
    load() {}

    generate() {
        const pathToAsset = this.urlJoin(
            this.options.publicURL,
            this.generateBundleName()
        );
    
        return [
            {
                type: 'js',
                value: `module.exports=eval('require(${JSON.stringify(`.${pathToAsset}`)})');`
            }
        ];
    }

    urlJoin(publicURL, assetPath) {
        const url = URL.parse(publicURL, false, true);
        const assetUrl = URL.parse(assetPath);
        url.pathname = path.posix.join(url.pathname, assetUrl.pathname);
        url.search = assetUrl.search;
        url.hash = assetUrl.hash;

        return URL.format(url);
    }
}

module.exports = NodeAsset;