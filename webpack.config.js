var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
 context: __dirname,
 devtool: debug ? "inline-sourcemap" : null,
 entry: "./client.js",
 output: {
   path: __dirname + '/dist',
   filename: "bundle.js"
 },
 module: {
   loaders: [
     {
       test: /\.jsx?$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015', 'react', 'stage-2']       }
     },
     {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
     }
   ]
 },
 plugins: debug ? [] : [
   new webpack.optimize.DedupePlugin(),
   new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),

 ],
};