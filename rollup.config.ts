import resolve from 'rollup-plugin-node-resolve';
import camelCase from 'lodash/camelCase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';

const pkg = require('./package.json');

const libraryName = 'handie';

export default {
  input: `src/index.ts`,
  output: [
    { file: `dist/${pkg.main.replace('dist/', '')}`, name: camelCase(libraryName), format: 'es', sourcemap: false },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
