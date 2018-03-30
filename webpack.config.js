// This library allows us to combine paths easily
const path = require('path');

module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: path.resolve(__dirname, './build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules|build/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: {
            includePaths: ['src/styles', 'node_modules', 'public']
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
		    loader: "file-loader"
      }
    ]
  },
  externals: {
    'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
  }
};
