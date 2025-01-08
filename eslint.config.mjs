import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: [
      "node_modules/**",
      "dist/**",
      ".next/**",
      "next.config.js",
      "tailwind.config.ts",
      "*.js"
    ], // 기존 .eslintignore 대체
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // JSX에서 React 임포트가 필요하지 않도록 설정
    },
  },
];