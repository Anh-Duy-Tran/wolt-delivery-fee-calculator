import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    css: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.ts',
    globals: true,
  },
});
