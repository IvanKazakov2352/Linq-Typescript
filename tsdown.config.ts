import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/**/*.ts',
  clean: true,
  sourcemap: false,
  treeshake: true,
  dts: true,
  minify: true,
  outDir: './dist'
})