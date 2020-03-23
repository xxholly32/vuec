import transform from "../utils/transform";
import { compile, parseComponent } from "vue-template-compiler";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
export default {
  name: "vuec-preview",

  props: {
    value: String,
    default: ""
  },

  data() {
    return {
      styleTag: null
    };
  },

  render: function(h) {
    let self = this;
    if (self.value.indexOf("template") > -1) {
      // 查找template
      let parse, code;
      try {
        parse = parseComponent(self.value);
      } catch (error) {
        console.error("vue 文件解析失败");
        console.error(error);
      }
      try {
        code = compile(parse.template.content);
      } catch (error) {
        console.error("template 解析失败");
        console.error(error);
      }
      try {
        if (parse.styles[0]) {
          this.compliorStyle(parse.styles[0].content);
        }
      } catch (error) {
        console.error("style 解析失败");
        console.error(error);
      }

      return transform.renderFunc(h, code.ast, parse.script, self);
    }
  },
  methods: {
    compliorStyle(content) {
      postcss([autoprefixer])
        .process(content, {
          from: undefined,
          to: undefined
        })
        .then(result => {
          result.warnings().forEach(warn => {
            console.warn(warn.toString());
          });
          // console.error(result.css);
          // TODO: 1.支持多种样式打包
          if (!this.styleTag) {
            this.styleTag = document.createElement("style");
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(this.styleTag);
          }
          this.styleTag.innerHTML = result.css;
        });
    }
  }
};
