const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

console.log('_______________________________', process.env);

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html', chunks: ['main'] }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new ModuleFederationPlugin({
      remotes: {
        auth: 'auth@' + process.env.AUTH_APP + process.env.AUTH_PUBLIC_PATH + 'remoteEntry.js',
        bank: 'bank@' + process.env.BANK_APP + process.env.BANK_PUBLIC_PATH + 'remoteEntry.js',
      },
      shared: packageJson.dependencies,
    }),
    new FaviconsWebpackPlugin({
      logo: './public/app-logo-48.png',
      favicons: {
        path: process.env.CONTAINER_APP + process.env.CONTAINER_PUBLIC_PATH + 'assets/',
        icons: {
          android: true,
          appleIcon: true,
          favicons: true,
        },
      },
    }),
  ],
  output: {
    publicPath: process.env.CONTAINER_APP + process.env.CONTAINER_PUBLIC_PATH,
  },
});
