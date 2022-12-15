/* eslint-disable @typescript-eslint/no-var-requires */

const { join: joinPath, resolve: resolvePath } = require('path');
const mock = require('mocker-api');

const { DEMO_ROOT_DIR, VUE_APP_DIR } = require('./scripts/helper');

const APP_PATH = `./${VUE_APP_DIR}`;

function resolve(dir) {
  return joinPath(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/preview/vue/' : '/',
  configureWebpack: {
    entry: {
      app: `${APP_PATH}/src/main.ts`,
    },
    resolve: {
      alias: {
        '@handie/runtime-core/dist': resolve('./packages/runtime-core/src'),
        '@handie/runtime-core': resolve('./packages/runtime-core/src/index.ts'),
        'handie-vue/dist': resolve('./packages/handie-vue/src'),
        'handie-vue': resolve('./packages/handie-vue/src/index.ts'),
        '@handie/bulbasaur/dist': resolve('./packages/bulbasaur/src'),
        '@handie/bulbasaur': resolve('./packages/bulbasaur/src/index.ts'),
        '@': resolve(`${APP_PATH}/src/shared`),
      },
    },
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].template = resolve(`${APP_PATH}/public/index.html`);

      return args;
    });

    config.plugin('fork-ts-checker').tap(args => {
      args[0].tsconfig = resolve(`${APP_PATH}/tsconfig.json`);

      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          fiber: require('fibers'),
        },
        additionalData: `@import "kokiri/dist/themes/antd/helper";`,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    before: app => mock(app, resolvePath(`./${DEMO_ROOT_DIR}/mock/index.js`)),
  },
};
