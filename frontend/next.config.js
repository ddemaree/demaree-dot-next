const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

require('dotenv').config()

module.exports = {
  webpack: (config, { dev }) => {
    const extractCss = !dev;

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
          resolve(newObj);
        })
      })
    }

    const styleLoaders = [
      { 
        loader: 'css-loader',
        options: { 
          minimize: dev,
          importLoaders: 1
        }
      },
      { loader: 'postcss-loader', options: { sourceMap: true } }
    ]

    const styleLoaderRule = {
      test: /\.(scss|sass|css)$/i,
      include: [__dirname],
      use: (
        extractCss ?
        ExtractTextPlugin.extract({use: styleLoaders}) :
        styleLoaders
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
    if(extractCss) {
      const extractCSSPlugin = new ExtractTextPlugin({
        filename: (getPath) => {
          return getPath('[name].css').replace('.js', '');
        }
      });
      config.plugins.push(extractCSSPlugin);
    }

    return config
  },
  webpackDevMiddleware: (config) => {
    const { watchOptions } = config;
    const newWatchOptions = Object.assign({}, watchOptions, {poll: true});
    const newConfig = Object.assign({}, config, {watchOptions: newWatchOptions});
    return newConfig;
  }
}
