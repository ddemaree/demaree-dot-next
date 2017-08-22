const webpack = require('webpack');

module.exports = {
  webpack: (config, { dev }) => {
    // env vars that should be visible to the client must be whitelisted here
    const defines = new webpack.DefinePlugin({
      'process.env.POSTS_API': JSON.stringify(process.env.POSTS_API)
    });
    config.plugins.push(defines);

    return config
  },
  webpackDevMiddleware: (config) => {
    const { watchOptions } = config;
    const newWatchOptions = { ...watchOptions, poll: true }
    const newConfig = { ...config, watchOptions: newWatchOptions } 
    return newConfig;
  }
}
