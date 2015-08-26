module.exports = {
  entry: "./resources/assets/app.js",
  output: {
    path: './public/js',
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue-loader" },
    ]
  },
  devtool: '#source-map'
};
