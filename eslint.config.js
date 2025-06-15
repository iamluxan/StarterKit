exports = {
  root: true,
  env: {
    browser: true,
    node: true, // ✅ Ajoute cette ligne
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script", // ou "module" si tu restes en import/export
  },
  extends: ["eslint:recommended"],
  rules: {
    // ...
  },
};