(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('codemirror'), require('markdown-it'), require('simple-assign'), require('mine-jsjs'), require('vue-template-compiler'), require('postcss'), require('autoprefixer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'codemirror', 'markdown-it', 'simple-assign', 'mine-jsjs', 'vue-template-compiler', 'postcss', 'autoprefixer'], factory) :
  (global = global || self, factory(global.vuec = {}, global.CodeMirror, global.MarkdownIt, global.assign$1, global.mineJsjs, global.vueTemplateCompiler, global.postcss, global.autoprefixer));
}(this, (function (exports, CodeMirror, MarkdownIt, assign$1, mineJsjs, vueTemplateCompiler, postcss, autoprefixer) { 'use strict';

  CodeMirror = CodeMirror && Object.prototype.hasOwnProperty.call(CodeMirror, 'default') ? CodeMirror['default'] : CodeMirror;
  MarkdownIt = MarkdownIt && Object.prototype.hasOwnProperty.call(MarkdownIt, 'default') ? MarkdownIt['default'] : MarkdownIt;
  assign$1 = assign$1 && Object.prototype.hasOwnProperty.call(assign$1, 'default') ? assign$1['default'] : assign$1;
  postcss = postcss && Object.prototype.hasOwnProperty.call(postcss, 'default') ? postcss['default'] : postcss;
  autoprefixer = autoprefixer && Object.prototype.hasOwnProperty.call(autoprefixer, 'default') ? autoprefixer['default'] : autoprefixer;

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
      this.currentOptions = Object.assign({}, DEFAULT_OPTIONS, this.options);
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

  var Preview = {
    name: "vuem-preview",

    props: {
      value: String,
      default: ""
    },

    render: function(h) {
      let html = new MarkdownIt().render(this.value);
      return h("div", {
        domProps: {
          innerHTML: html
        }
      });
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

  var script = {
    name: "CodeBox",
    data: function() {
      return {
        showCode: true
      };
    },

    methods: {
      changeCode() {
        this.showCode = !this.showCode;
        this.$emit("showCode", this.showCode);
      }
    }
  };

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

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "code-box-meta" }, [
      _c("div", { staticClass: "code-box-action" }, [
        _c("span", { staticClass: "code-box-expand" }, [
          _c(
            "button",
            { attrs: { collpse: "" }, on: { click: _vm.changeCode } },
            [
              _vm._v(
                "\n        " +
                  _vm._s(_vm.showCode ? "收起编辑" : "展开编辑") +
                  "\n      "
              )
            ]
          )
        ])
      ])
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
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
      undefined,
      undefined,
      undefined
    );

  // import { compile } from 'vue-template-compiler';
  var Vuem = {
    name: "Vuem",

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
            class: "vuec-editor",
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
        h("div", { class: "vuec" }, [
          editordiv,
          h(Preview, {
            class: "vuec-preview",
            style: {
              width: this.showEditor && this.showTools ? "50%" : "100%"
            },
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

  var assign = Object.assign || assign$1;

  const DEFAULT_OPTIONS$1 = {
    lineNumbers: true,
    mode: "text/x-vue",
    theme: "material",
    tabSize: 2
  };

  var Editor$1 = {
    name: "VueCodeMirror",

    props: ["value", "options"],

    render(h) {
      return h("div", null, [h("textarea", { ref: "textarea" }, this.value)]);
    },

    mounted() {
      this.currentOptions = assign({}, DEFAULT_OPTIONS$1, this.options);
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
      console.error("js 引擎解析失效");
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

  var Preview$1 = {
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
          parse = vueTemplateCompiler.parseComponent(self.value);
        } catch (error) {
          console.error("vue 文件解析失败");
          console.error(error);
        }
        try {
          code = vueTemplateCompiler.compile(parse.template.content);
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

  var script$1 = {
    name: "CodeBox",
    data: function() {
      return {
        showCode: true
      };
    },

    methods: {
      changeCode() {
        this.showCode = !this.showCode;
        this.$emit("showCode", this.showCode);
      }
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "code-box-meta" }, [
      _c("div", { staticClass: "code-box-action" }, [
        _c("span", { staticClass: "code-box-expand" }, [
          _c(
            "button",
            { attrs: { collpse: "" }, on: { click: _vm.changeCode } },
            [
              _vm._v(
                "\n        " +
                  _vm._s(_vm.showCode ? "收起编辑" : "展开编辑") +
                  "\n      "
              )
            ]
          )
        ])
      ])
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  // import { compile } from 'vue-template-compiler';
  var Vuec = {
    name: "Vuec",

    components: { Toolbar: __vue_component__$1 },

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
        ? h(__vue_component__$1, {
            on: {
              showCode: this.codeBtnChange
            }
          })
        : null;
      const editordiv = this.showTools
        ? h(Editor$1, {
            class: "vuec-editor",
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
        h("div", { class: "vuec" }, [
          editordiv,
          h(Preview$1, {
            class: "vuec-preview",
            style: {
              width: this.showEditor && this.showTools ? "50%" : "100%"
            },
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

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component(Vuec.name, Vuec);
    Vue.component(Vuem.name, Vuem);
  }

  const plugin = {
    install
  };

  if (typeof Vue !== "undefined") {
    Vue.use(install); // eslint-disable-line
  }
  // Auto-install when vue is found (eg. in browser via <script> tag)
  let GlobalVue = null;
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }

  exports.default = install;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
