import rollupTs from 'rollup-plugin-typescript'
import ts from 'typescript'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'es',
      file: pkg.module,
    },
  ],
  plugins: [
    rollupTs({
      typescript: ts,
    }),
  ],
}
