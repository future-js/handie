import { defineConfig } from 'umi';
import routes from './src/entry/routes'

const { join: joinPath } = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires

function resolve(dir) {
  return joinPath(__dirname, dir);
}

export default defineConfig({
  title: 'React app demo',
  alias: {
    'handie-react/dist': resolve('../../packages/handie-react/src'),
    'handie-react': resolve('../../packages/handie-react/src/index.ts'),
    '@handie/squirtle/dist': resolve('../../packages/squirtle/src'),
    '@handie/squirtle': resolve('../../packages/squirtle/src/index.ts'),
    'handie-react-starter-antd/dist': resolve('../../packages/starter-antd/src'),
    'handie-react-starter-antd': resolve('../../packages/starter-antd/src/index.ts'),
    'handie-react-starter-umi/dist': resolve('../../packages/starter-umi/src'),
    'handie-react-starter-umi': resolve('../../packages/starter-umi/src/index.ts'),
  },
  nodeModulesTransform: { type: 'none' },
  extraBabelIncludes: ['@zoras/core', '@zoras/adapter-ant-design', '@handie/squirtle'],
  sass: {
    implementation: require('sass'),
    sassOptions: { fiber: require('fibers') },
    prependData: `@import "~@/shared/styles/helper";`,
  },
  routes,
  fastRefresh: {},
});
