const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { webpack } = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  stats: 'errors-only',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash:8].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname)
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    mainFiles: ['index.js', 'index.jsx', 'index.ts', 'index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          }
        ]
      },
      {
        test: /\.(css|less|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // new webpack.DllPugin({
    //     name: '[name]_[hash]',
    //     path: path.join(__dirname, 'dist', '[name]-manifest.json'),
    //     context: __dirname,
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Nougat.online',
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 3000,
    open: false
  }
};
