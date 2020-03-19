'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var CodeMirror = _interopDefault(require('codemirror'));
var assign$1 = _interopDefault(require('simple-assign'));
var mineJsjs = require('mine-jsjs');
var vueTemplateCompiler = require('vue-template-compiler');
var postcss = _interopDefault(require('postcss'));
var autoprefixer = _interopDefault(require('autoprefixer'));

var assign = Object.assign || assign$1;

const DEFAULT_OPTIONS = {
  lineNumbers: true,
  mode: "text/x-vue",
  theme: "material",
  tabSize: 2
};

var Editor = {
  name: "VueCodeMirror",

  props: ["value", "options"],

  render(h) {
    return h("div", null, [h("textarea", { ref: "textarea" }, this.value)]);
  },

  mounted() {
    this.currentOptions = assign({}, DEFAULT_OPTIONS, this.options);
    this.editor = CodeMirror.fromTextArea(
      this.$refs.textarea,
      this.currentOptions
    );
    this.editor.on("change", this.handleChange);
  },

  watch: {
    value(val) {
      val !== this.editor.getValue() && this.editor.setValue(val);
    }
  },

  methods: {
    handleChange() {
      /* istanbul ignore next */
      this.$emit("change", this.editor.getValue());
    }
  }
};

/**
 * javascript comment
 * @Author: xiangxiao3
 * @Date: 2020-02-22 11:37:20
 * @Desc:
 */
function parseDaddyName(str, scriptname) {
  try {
    if (str.indexOf("export default") > -1) {
      str = str.replace(/export default /, "module.exports = ");
    }

    // js to js function from  https://github.com/anuoua/minejs
    const runner = mineJsjs.run(str, { injectObj: {}, module: true });

    return typeof runner[scriptname] === "function"
      ? runner[scriptname]()
      : runner[scriptname];
  } catch (error) {
    console.error(error);
  }
}

/**
 * javascript comment
 * @Author: xiangxiao3
 * @Date: 2020-02-26 15:35:49
 * @Desc: get propertys from script
 */
function fetchExpression(key, script, type = "data") {
  if (key.match(/[a-zA-Z]+/)) {
    let props = parseDaddyName(script.content, type);
    // 用.分割，form.name => props[form][name]
    return key.split(".").reduce((res, val) => res[val], props);
  } else {
    return mineJsjs.run(key);
  }
}

// function renderScoped(h, slotarr) {
//   let slots = {};
//   for (let slot of slotarr) {
//     slots.body = () =>
//       h(slot.type, {
//         props: slot.props,
//         attr: slot.attr,
//       });
//   }
//   return slots;
// }

function transformStr(str, script) {
  const braces = /(?={{).*(?<=}})/;

  // TODO： cant match spaces
  const match = str.match(/(?<={{\s+).*(?=\s+}})/);

  if (match) {
    str = str.replace(braces, fetchExpression(match[0], script));
  }
  return str;
}

function renderElement(h, comp, script) {
  let children = [];

  if (comp.children && comp.children.length > 0) {
    for (let n of comp.children) {
      if (n.type === 1) {
        children.push(renderElement(h, n, script));
      } else if (n.type === 2) {
        // {{xx}} 表达式解析
        children.push(transformStr(n.text, script));
      } else if (n.type === 3) {
        children.push(n.text);
      }
    }
  }
  let props = {};
  let slot = null;
  let style = comp.staticStyle ? JSON.parse(comp.staticStyle) : {};
  let kclass = comp.staticClass
    ? comp.staticClass
        .slice(1, comp.staticClass.length - 1)
        .split(" ")
        .reduce((res, val) => {
          res[val] = val;
          return res;
        }, {})
    : [];
  let on = {};
  let domProps = {};

  if (comp.attrsMap) {
    for (let key in comp.attrsMap) {
      // filter string contant :, like :msg
      let match = key.match(/(?<=:).*/);

      if (match) {
        props[match[0]] = script
          ? fetchExpression(comp.attrsMap[key], script)
          : {};
      } else if (key === "v-slot" || key === "slot") {
        slot = comp.attrsMap[key];
      } else if (key === "style") {
        continue;
      } else if (key === "class") {
        continue;
      } else if (key === "model" || key === "v-model") {
        props.value = fetchExpression(comp.attrsMap[key], script);
        // 未加入双向绑定，mock可以从这里面加
        // debugger;
        continue;
      } else if (key.match(/(?<=(@|v-))\w+/)) {
        // event
        let eventkey = key.match(/(?<=(@|v-))\w+/)[0];
        on[eventkey] = fetchExpression(comp.attrsMap[key], script, "methods");
        continue;
      } else {
        props[key] = comp.attrsMap[key];
      }
    }
  }

  // depobj api https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
  const depObj = {
    // props: comp.attrsMap,
    props,
    slot,
    style,
    class: kclass,
    domProps,
    on
    // scopedSlots: comp.scopedSlots ? renderScoped(h, comp.scopedSlots) : null,
  };
  const tag = comp.tag === "template" ? "div" : comp.tag;

  return h(tag, depObj, children);
}

var transform = {
  renderFunc: renderElement
};

var Preview = {
  name: "vuec-preview",

  props: {
    value: String,
    default: ""
  },

  render: function(h) {
    let self = this;
    if (self.value.indexOf("template") > -1) {
      // 查找template
      const parse = vueTemplateCompiler.parseComponent(self.value);
      const code = vueTemplateCompiler.compile(parse.template.content);

      if (parse.styles[0]) {
        this.compliorStyle(parse.styles[0].content);
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
          // console.log(result.css);
          let style = document.createElement("style");
          style.type = "text/css";
          style.innerHTML = result.css;
          document
            .getElementsByTagName("HEAD")
            .item(0)
            .appendChild(style);
        });
    }
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: "CodeBox",
  data: function () {
    return {
      showCode: true
    }
  },

  methods: {
    changeCode() {
      this.showCode = !this.showCode;
      this.$emit("showCode", this.showCode);
    }
  }
};

var __$_require_image_code_not_open_svg__ = { render: function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":"1024","height":"1024","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M1018.645 531.298c8.635-18.61 4.601-41.42-11.442-55.864l-205.108-184.68c-19.7-17.739-50.05-16.148-67.789 3.552-17.738 19.7-16.148 50.051 3.553 67.79l166.28 149.718-167.28 150.62c-19.7 17.738-21.291 48.088-3.553 67.789 17.739 19.7 48.089 21.291 67.79 3.553l205.107-184.68a47.805 47.805 0 0012.442-17.798zM119.947 511.39l166.28-149.719c19.7-17.738 21.29-48.088 3.552-67.789-17.738-19.7-48.088-21.291-67.789-3.553L16.882 475.01C.84 489.456-3.194 512.264 5.44 530.874a47.805 47.805 0 0012.442 17.798l205.108 184.68c19.7 17.739 50.05 16.148 67.79-3.552 17.738-19.7 16.147-50.051-3.553-67.79L119.947 511.39z","fill":"#000","fill-rule":"evenodd","opacity":".78"}})]) } };

var __$_require_image_code_open_svg__ = { render: function () { var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":"1024","height":"1024","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M1018.645 531.298c8.635-18.61 4.601-41.42-11.442-55.864l-205.108-184.68c-19.7-17.739-50.05-16.148-67.789 3.552-17.738 19.7-16.148 50.051 3.553 67.79l166.28 149.718-167.28 150.62c-19.7 17.738-21.291 48.088-3.553 67.789 17.739 19.7 48.089 21.291 67.79 3.553l205.107-184.68a47.805 47.805 0 0012.442-17.798zM119.947 511.39l166.28-149.719c19.7-17.738 21.29-48.088 3.552-67.789-17.738-19.7-48.088-21.291-67.789-3.553L16.882 475.01C.84 489.456-3.194 512.264 5.44 530.874a47.805 47.805 0 0012.442 17.798l205.108 184.68c19.7 17.739 50.05 16.148 67.79-3.552 17.738-19.7 16.147-50.051-3.553-67.79L119.947 511.39zm529.545-377.146c24.911 9.066 37.755 36.61 28.688 61.522L436.03 861.068c-9.067 24.911-36.611 37.755-61.522 28.688-24.911-9.066-37.755-36.61-28.688-61.522l242.15-665.302c9.067-24.911 36.611-37.755 61.522-28.688z","fill":"#000","fill-rule":"evenodd","opacity":".78"}})]) } };

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "code-box-meta" }, [
    _c("div", { staticClass: "code-box-action" }, [
      _c("span", { staticClass: "code-box-expand" }, [
        _c("img", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.showCode,
              expression: "!showCode"
            }
          ],
          attrs: {
            src: __$_require_image_code_not_open_svg__,
            alt: "expand code"
          },
          on: { click: _vm.changeCode }
        }),
        _vm._v(" "),
        _c("img", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.showCode,
              expression: "showCode"
            }
          ],
          attrs: {
            src: __$_require_image_code_open_svg__,
            title: "收起代码",
            alt: "collpse code"
          },
          on: { click: _vm.changeCode }
        })
      ])
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-7a088d3e_0", { source: "\n.code-box-action[data-v-7a088d3e] {\n  width: 100%;\n  text-align: center;\n}\n.code-box-action img[data-v-7a088d3e] {\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n}\n", map: {"version":3,"sources":["/Users/xiangxiao/Documents/work/workspace/vue-runtime-component-demo/packages/vuec/components/toolbar.vue"],"names":[],"mappings":";AAyCA;EACA,WAAA;EACA,kBAAA;AACA;AAEA;EACA,eAAA;EACA,WAAA;EACA,YAAA;AACA","file":"toolbar.vue","sourcesContent":["<template>\n  <div class=\"code-box-meta\">\n    <div class=\"code-box-action\">\n      <span class=\"code-box-expand\">\n        <img\n          src=\"./image/code-not-open.svg\"\n          v-show=\"!showCode\"\n          @click=\"changeCode\"\n          alt=\"expand code\"\n        />\n        <img\n          src=\"./image/code-open.svg\"\n          v-show=\"showCode\"\n          @click=\"changeCode\"\n          title=\"收起代码\"\n          alt=\"collpse code\"\n        />\n      </span>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \"CodeBox\",\n  data: function () {\n    return {\n      showCode: true\n    }\n  },\n\n  methods: {\n    changeCode() {\n      this.showCode = !this.showCode;\n      this.$emit(\"showCode\", this.showCode);\n    }\n  }\n};\n</script>\n\n<style scoped>\n.code-box-action {\n  width: 100%;\n  text-align: center;\n}\n\n.code-box-action img {\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-7a088d3e";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// import { compile } from 'vue-template-compiler';
var Vuec = {
  name: "Vuec",

  components: { Toolbar: __vue_component__ },

  props: {
    template: String,
    options: {},
    showTools: {
      type: Boolean,
      default: true
    },
    showCode: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      preview: "",
      showEditor: true
    };
  },

  render(h) {
    const tooldiv = this.showTools
      ? h(__vue_component__, {
          on: {
            showCode: this.codeBtnChange
          }
        })
      : null;
    const editordiv = this.showTools
      ? h(Editor, {
          class: "vuep-editor",
          style: {
            display: this.showEditor ? "block" : "none"
          },
          props: {
            value: this.template,
            options: this.options,
            showEditor: this.showEditor
          },
          on: {
            change: [this.executeCode, val => this.executeCode(val)]
          }
        })
      : null;

    return h("div", [
      tooldiv,
      h("div", { class: "vuep" }, [
        editordiv,
        h(Preview, {
          class: "vuep-preview",
          props: {
            value: this.preview
          }
        })
      ])
    ]);
  },

  watch: {
    template: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          val && this.executeCode(val);
        }
      }
    }
  },

  methods: {
    executeCode(code) {
      this.error = "";

      this.preview = code;
      this.$emit("change", code);
    },
    codeBtnChange(isShow) {
      this.showEditor = isShow;
    }
  }
};

Vuec.config = function(opts) {
  Vuec.props.options.default = () => opts;
};

function install(Vue, opts) {
  Vuec.config(opts);
  Vue.component(Vuec.name, Vuec);
}

Vuec.install = install;

if (typeof Vue !== "undefined") {
  Vue.use(install); // eslint-disable-line
}

module.exports = Vuec;
