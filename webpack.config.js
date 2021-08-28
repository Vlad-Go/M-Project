const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const autoprefixer = require('autoprefixer');

const isProd = process.env.NODE_ENV = 'production';
const isDev = !isProd;
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoader = () =>{
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ];
  if (isDev) loaders.push('eslint-loader');
};


module.exports = {
  context: path.resolve(__dirname, './src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: filename('js')
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    hot: isDev,
    port: 8081
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'postcss-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoader()
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/favicon.ico'),
    //       to: path.resolve(__dirname, 'dist/favicon.ico')
    //     }
    //   ]
    // }),
    new HtmlWebpackPlugin({
      template: './index.html',
      // favicon: 'favicon.ico',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ]
};