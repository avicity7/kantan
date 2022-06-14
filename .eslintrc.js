module.exports = {
  env: {
    es2021: true,
  },
  extends: ["plugin:prettier/recommended"],
  plugins: ["react", "react-native"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
};
