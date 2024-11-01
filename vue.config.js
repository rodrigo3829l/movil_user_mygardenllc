// vue.config.js
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.runtime.esm-bundler.js", // Configuración de runtime
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        options.compilerOptions = {
          isCustomElement: (tag) => tag.startsWith("ion-"), // Ignorar componentes de Ionic
        };
        return options;
      });
  },
});
