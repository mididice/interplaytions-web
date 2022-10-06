const path = require('path');

module.exports = {
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader'
      },
      {
        test: require.resolve('Phaser'),
        loader: 'expose-loader',
        options: { exposes: { globalName: 'Phaser', override: true } }
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, './'),
    host: 'localhost',
    port: 8080,
    open: false,
    proxy: {
      '/api/': {
        target: 'http://localhost:8000',
        chagneOrigin: true,
      },
      '/code/': {
        target: 'http://localhost:2017',
        chagneOrigin: true,
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
