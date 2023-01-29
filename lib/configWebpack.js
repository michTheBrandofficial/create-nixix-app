import {writeFileSync} from 'fs';
import path from 'path';

export default function configWebpack() {
  const webpack = `
  const path = require('path');
  const htmlWebpackPlugin = require('html-webpack-plugin');
  const miniCSSExtractPlugin = require('mini-css-extract-plugin');
  
  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'output.js'
    },
    devServer: {
      port: 2000,
    },
    mode: 'development',
    devtool: false,
    resolve: {
      extensions: [
        '.js'
      ],
      alias: {
        '@nixix': path.resolve(__dirname, 'node_modules/nixix/js-lib/nixix.js'),
        '@nixix-render': path.resolve(__dirname, 'node_modules/nixix/js-lib/render.js'),
        '@nixix-hooks': path.resolve(__dirname, 'node_modules/nixix/js-lib/hooks.js')
      }
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.join(__dirname, 'public/index.html')
      }),
      new miniCSSExtractPlugin({
        filename: 'styles.css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [miniCSSExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }`

  writeFileSync(path.join('./', 'webpack.config.cjs'), webpack);
};