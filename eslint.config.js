import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default {
  files: ["**/*.{js,mjs,cjs,vue,ts,tsx}"],
  ignores: [
    ".github/**",
    "android/**",
    "dist/**",
    "ios/**",
    "node_modules/**",
    "public/**",
    "src/**",
    "android/app/build/intermediates/assets/debug/native-bridge.js",
    "tests/**",
    "vue.config.js"
  ],
  languageOptions: {
    parser: typescriptParser,
    globals: globals.browser,
  },
  plugins: {
    vue: pluginVue,
    "@typescript-eslint": typescriptPlugin,
  },
  rules: {
    ...pluginVue.configs["essential"].rules,
    ...typescriptPlugin.configs["recommended"].rules, // Carga las reglas recomendadas de TypeScript
    "@typescript-eslint/no-unused-vars": "off", // Desactiva explícitamente la regla
  },
};
