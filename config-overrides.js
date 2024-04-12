const webpack = require('webpack');

// rest of your code

module.exports = function override(config, env) {
      // Polyfills for `crypto`, `buffer`, `stream`, `os`, `path`, and `process`
      config.resolve.fallback = {
            ...config.resolve.fallback,
            crypto: require.resolve('crypto-browserify'),
            buffer: require.resolve('buffer/'),
            stream: require.resolve('stream-browserify'),
            os: require.resolve('os-browserify/browser.js'),
            path: require.resolve('path-browserify'),
            process: require.resolve('process/browser.js'), // Make sure this path is correct
      };

      // Adding the DefinePlugin to define 'process.env' globally
      config.plugins = config.plugins || [];
      config.plugins.push(
            new webpack.ProvidePlugin({
                  process: 'process/browser.js',
            }),
            new webpack.DefinePlugin({
                  'process.env': JSON.stringify(process.env),
            })
      );

      return config;
};
