// Active les traces de dépréciation dans le terminal
process.traceDeprecation = true;

import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import LicensePlugin from 'webpack-license-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin.js';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const isWatch = process.argv.includes('--watch');

export default {
  mode: isProduction ? 'production' : 'development',

  entry: {
    theme: ['./assets/scripts/base.js', './assets/styles/base.scss'],
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },

  resolve: {
    preferRelative: true,
  },

  stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    timings: true,
    colors: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            compact: false,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: !isProduction },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: !isProduction },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: !isProduction },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              postcssOptions: {
                plugins: [autoprefixer()],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: path.join('..', 'icons', 'sprite.svg'),
            },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.(png|woff2?|eot|otf|ttf|svg|jpe?g|gif)(\?[a-z0-9=\.]+)?$/,
        exclude: path.resolve(__dirname, 'assets/icons'),
        type: 'asset/resource',
        generator: {
          filename: 'dist/css/[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('..', 'css', '[name].css'),
    }),

    new ESLintPlugin({
      extensions: ['js'],
      emitWarning: true,
      failOnError: false,
      context: path.resolve(__dirname, 'assets/scripts'),
    }),

    new LicensePlugin({
      outputFilename: 'thirdPartyNotice.json',
      licenseOverrides: {
        'bootstrap-touchspin@3.1.1': 'Apache-2.0',
      },
      replenishDefaultLicenseTexts: true,
    }),

    new SpriteLoaderPlugin({ plainSprite: true }),

    ...(isWatch
      ? [
          new BrowserSyncPlugin(
            {
              proxy: 'http://localhost:8000',
              files: ['**/*.php'],
              injectChanges: true,
              open: false,
              notify: false,
            },
            {
              reload: false,
            }
          ),
        ]
      : []),
  ],

  optimization: isProduction
    ? {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            extractComments: false,
            terserOptions: {
              compress: { drop_console: true },
            },
          }),
          new CssMinimizerPlugin(),
        ],
      }
    : {
        minimize: false,
      },

  infrastructureLogging: {
    level: 'error',
  },
};