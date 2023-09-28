const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/app-logo-48.png',
      chunks: ['main', 'sw'],
    }),
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
  devServer: { port: process.env.PORT, historyApiFallback: true },
  output: {
    publicPath: `${process.env.CONTAINER_APP}/`,
  },
});
