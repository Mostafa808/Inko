const path = require('path');

module.exports = {
  mode: 'development', // production or development
  entry: {
    Basic: '../Scripts/Basic.ts',
    //animation: '../Scripts/Animation.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts and .tsx regex
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [
        path.resolve(__dirname, 'node_modules'),
      ],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js', // bundle name generator
    path: path.resolve(__dirname, './../../Inko_Site/resources/js/bundles'), // Output directory
    libraryTarget: 'var',
    library: '[name]Lib',
  },

};
