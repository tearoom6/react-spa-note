const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: { js: __dirname + '/src/main.js', css: __dirname + '/src/main.css' },
  output: { path: __dirname + '/public', filename: 'bundle.[name]' },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-easy-import')({ glob: true }),
                ],
              },
            },
          ],
        }),
      },
    ],
  },
  devServer: {
    contentBase: __dirname + '/public',
    port: 8080,
    inline: true,
    historyApiFallback: true,
    stats: {
      version: false,
      hash: false,
      chunkModules: false,
    },
    proxy: {
      '*': 'http://127.0.0.1:8081'
    },
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true,
    }),
  ],
  devtool: 'source-map',
}
