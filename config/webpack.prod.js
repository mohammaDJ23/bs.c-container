const { ModuleFederationPlugin } = require('webpack').container;
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new ModuleFederationPlugin({
      remotes: {
        auth: `auth@${process.env.AUTH_APP}/auth/static/remoteEntry.js`,
        bank: `bank@${process.env.BANK_APP}/bank/static/remoteEntry.js`,
      },
    }),
  ],
  output: {
    publicPath: `${process.env.CONTAINER_APP}/container/static/`,
  },
});
