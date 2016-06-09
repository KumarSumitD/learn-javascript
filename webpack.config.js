module.exports = {
  entry: "./www/js/react/components/facebookLogin.js",
  output: {
    filename: "www/public/bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules|public)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};