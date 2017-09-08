const webpack = require('webpack');

module.exports = {
  webpack: (config, { dev }) => {
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

    return config
  },
  webpackDevMiddleware: (config) => {
    const { watchOptions } = config;
    const newWatchOptions = Object.assign({}, watchOptions, {poll: true});
    const newConfig = Object.assign({}, config, {watchOptions: newWatchOptions});
    return newConfig;
  }
}
