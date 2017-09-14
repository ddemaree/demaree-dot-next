module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 1%'],
      features: {
        // Don't transpile custom properties
        customProperties: false
      }
    },
    'postcss-nested': {},
  },
};