module.exports = {
  plugins: ["@typescript-eslint", "jest", "promise"],
  extends: [
    "universe",
    "universe/native",
    "universe/shared/typescript-analysis",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  rules: {
    "linebreak-style": ["error", "unix"],
    "no-console": "error",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "react/require-default-props": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  settings: {
    jest: {
      version: 26,
    },
  },
};
