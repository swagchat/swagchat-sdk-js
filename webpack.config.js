var webpack = require('webpack');
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /(node_modules|dist)/,
      }
    ]
  },
  devtool: "source-map",
  node: {
    fs: "empty"
  }
}