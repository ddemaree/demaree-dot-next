const webpack = require('webpack')
const { basename, dirname, join, relative, resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const settings = {
  extensions: ['.js','.jsx','.ts','.scss','.sass','.css','.png','.svg','.gif','.jpeg','.jpg']
}

const { env } = require('process');
const extensionGlob = `**/*{${settings.extensions.join(',')}}`;

// TODO: Need to make the ASSET HOST/prefix configurable
const publicPath  = '/assets/';
const outputPath  = resolve('./assets');
const contentBase = resolve('./assets');

module.exports = {
  entry: {
    main: './src/main.js'
  },

  // FIXME: Need betterer values?
  output: {
    filename: '[name].js',
    path: resolve('./assets'),
    publicPath,
    pathinfo: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: env.NODE_ENV === 'production' } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            'resolve-url-loader',
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath,
            name: env.NODE_ENV === 'production' ? '[name]-[hash].[ext]' : '[name].[ext]'
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'),
    new ManifestPlugin({
      publicPath,
      writeToFileEmit: true
    })
  ],

  resolve: {
    extensions: settings.extensions,
    modules: [
      'node_modules'
    ]
  },

  resolveLoader: {
    modules: ['node_modules']
  },

  devServer: {
    host: '0.0.0.0',
    port: 9000,
    contentBase,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    allowedHosts: [
      '.demaree.me',
    ],
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000,
      aggregateTimeout: 1000
    }
  }
}
