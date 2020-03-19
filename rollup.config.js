import vue from "rollup-plugin-vue";
import svg from "rollup-plugin-vue-inline-svg";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: "./packages/vuec/index.js",
  output: {
    file: "./packages/vuec/dist/index.cjs.js",
    format: "cjs"
  },
  // ...
  plugins: [
    // ...
    svg(),
    commonjs(),
    vue(/* options */)
  ]
};
