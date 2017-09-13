const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const { resolve, join } = require('path');

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
            'main.js': myMainEntries,
            'alt.js': [require.resolve('./lib/pack-test.js')]
          })
          // console.log(newObls.j)
          resolve(nextEntryObj);
        })
      })
    }

    // const styleLoaderRule = {
    //   test: /\.(scss|sass|css)$/i,
    //   include: [__dirname],
    //   use: ExtractTextPlugin.extract({
    //     fallback: 'style-loader',
    //     use: [
    //       { loader: 'css-loader', options: { minimize: dev } },
    //       { loader: 'postcss-loader', options: { sourceMap: true } },
    //       'resolve-url-loader',
    //       { loader: 'sass-loader', options: { sourceMap: true } }
    //     ]
    //   })
    // }

    const styleLoaderRule = {
      test: /\.(scss|sass|css)$/i,
      include: [__dirname],
      use: [
        'style-loader',
        { 
          loader: 'css-loader',
          options: { 
            minimize: dev,
            importLoaders: 1
            // modules: true,
            // localIdentName: "[name]__[local]___[hash:base64:5]"
          } 
        },
        { loader: 'postcss-loader', options: { sourceMap: true } },
        // 'resolve-url-loader',
        // { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    }

    

    config.module.rules.push(styleLoaderRule)
    // console.log(config.module.rules);

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
    const extractCSSPlugin = new ExtractTextPlugin('[name].css');
    config.plugins.push(extractCSSPlugin);
    console.log(config.plugins)

    return config
  },
  webpackDevMiddleware: (config) => {
    const { watchOptions } = config;
    const newWatchOptions = Object.assign({}, watchOptions, {poll: true});
    const newConfig = Object.assign({}, config, {watchOptions: newWatchOptions});
    return newConfig;
  }
}
