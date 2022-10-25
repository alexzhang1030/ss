import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  target: 'node16',
  format: ['esm'],
})
