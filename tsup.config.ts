import { defineConfig } from 'tsup';

export default defineConfig({
  minify: true,
  target: 'es2020',
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs']
});