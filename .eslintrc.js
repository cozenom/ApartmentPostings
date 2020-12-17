module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", "tab"],
    "linebreak-style": 0,
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
