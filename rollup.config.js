import vue from "rollup-plugin-vue";
// import svg from "rollup-plugin-vue-inline-svg";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./packages/index.js",
  output: {
    name: "vuec",
    exports: "named"
  },
  // ...
  plugins: [
    // ...
    commonjs(),
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
      template: { optimizeSSR: false }
    })
  ]
};
