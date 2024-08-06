import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    isolate: true,
    singleThread: true,
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "./__tests__/utils.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["json-summary", "text", "html"],
    },
  },
});