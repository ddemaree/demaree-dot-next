const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  webpack: (config, { dev }) => {
    // Decorate Next's entry function with a file of our own
    const nextEntry = config.entry;
    config.entry = () => {
      return new Promise((resolve) => {
        nextEntry()
        .then(nextEntryObj => {
          const nextMainEntries = nextEntryObj['main.js'];
          const myMainEntries = [...nextMainEntries, require.resolve('./lib/pack-test.js')]
          const newObj = Object.assign(nextEntryObj, { 
            'main.js': myMainEntries
          })
          resolve(nextEntryObj);
        })
      })
    }

    const styleLoaders = [
      // 'style-loader',
      { 
        loader: 'css-loader',
        options: { 
          minimize: dev,
          importLoaders: 1
          // modules: true,
          // localIdentName: "[name]__[local]___[hash:base64:5]"
        } 
      },
      { loader: 'postcss-loader', options: { sourceMap: true } }
    ]

    const styleLoaderRule = {
      test: /\.(scss|sass|css)$/i,
      include: [__dirname],
      use: (
        dev ?
        styleLoaders : 
        ExtractTextPlugin.extract({use: styleLoaders})
      )
    }

    config.module.rules.push(styleLoaderRule)

    // env vars that should be visible to the client must be whitelisted here
    // When running in Docker with local WordPress, need to provide a separate env var for the client-side API since `wordpress` isn't visible outside the container
    let POSTS_API;
    if(process.env.POSTS_CLIENT_API) {
      POSTS_API = JSON.stringify(process.env.POSTS_CLIENT_API);
    } else {
      POSTS_API = JSON.stringify(process.env.POSTS_API);
    }

    // Don't forget to stringify these, since they'll be plopped directly into client side JS code
    const defines = new webpack.DefinePlugin({
      'process.env.POSTS_API': POSTS_API,
      'process.env.CFUL_SPACE_ID': JSON.stringify(process.env.CFUL_SPACE_ID),
      'process.env.CFUL_ACCESS_TOKEN': JSON.stringify(process.env.CFUL_ACCESS_TOKEN)
    });
    config.plugins.push(defines);

    // Extract the CSS into its own file
    // const extractCSSPlugin = new ExtractTextPlugin(dev ? '[name]-[hash].css' : '[name].css');
    if(!dev) {
      const extractCSSPlugin = new ExtractTextPlugin('[name]-[hash:8].css');
      config.plugins.push(extractCSSPlugin);
    }

    console.log(config.output)

    return config
  },
  webpackDevMiddleware: (config) => {
    const { watchOptions } = config;
    const newWatchOptions = Object.assign({}, watchOptions, {poll: true});
    const newConfig = Object.assign({}, config, {watchOptions: newWatchOptions});
    return newConfig;
  }
}
