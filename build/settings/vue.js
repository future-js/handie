const path = require('path');

const LOADER_MAP = {
    less: 'less-loader',
    scss: 'sass-loader'
  };
const STYLE_RULES = ['less', 'scss'].map(lang => {
    return {
      test: new RegExp(`\.${lang}$`),
      use: ['style-loader', 'css-loader'].concat(LOADER_MAP[lang])
    };
  });

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './test/vue/app/index.js',
  output: {
    path: path.resolve(__dirname, '../../test/vue'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      // exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['env', {"modules": false}]],
          plugins: ['transform-vue-jsx']
        }
      }
    }, {
      test: /\.vue$/,
      use: 'vue-loader'
    }].concat(STYLE_RULES, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/images/[name].[hash:7].[ext]'
      }
    })
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /\handie\//,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};
