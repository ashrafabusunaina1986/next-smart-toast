import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

export default [
  // JS + CSS
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true },
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true }
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extract: 'index.css', // يتم إخراج CSS مستقل
        minimize: true
      })
    ],
    external: ['react', 'react-dom', 'framer-motion']
  },

  // Type Definitions
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];
