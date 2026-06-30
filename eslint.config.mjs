export default [
  {
    ignores: [".next/**", "dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    rules: {
      "no-console": "warn",
    },
  },
];
