const { ModuleFederationPlugin } = require('webpack').container;
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '../.env.development'),
});
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
    new ModuleFederationPlugin({
      remotes: {
        auth: `auth@${process.env.AUTH_APP}/remoteEntry.js`,
        bank: `bank@${process.env.BANK_APP}/remoteEntry.js`,
      },
    }),
  ],
  devServer: { port: 3004, historyApiFallback: true },
  output: {
    publicPath: `${process.env.CONTAINER_APP}/`,
  },
});
