import Editor from "./editor";
import Preview from "./preview";
import Toolbar from "./toolbar.vue";
// import { compile } from 'vue-template-compiler';
export default {
  name: "Vuem",

  components: { Toolbar },

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
      ? h(Toolbar, {
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

    return h(
      "div",
      {
        style: {
          height: "600px"
        },
        class: "vuec-container"
      },
      [
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
      ]
    );
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
