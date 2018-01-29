import typescript from 'rollup-plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    format: 'cjs',
    file: 'index.js',
    dir: 'dist',
  },
  plugins: [typescript()],
}
