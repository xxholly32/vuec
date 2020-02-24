import Editor from './editor';
import Preview from './preview';
// import { compile } from 'vue-template-compiler';
export default {
  name: 'Vuec',

  props: {
    template: String,
    options: {},
  },

  data() {
    return {
      preview: '',
    };
  },

  render(h) {
    return h('div', { class: 'vuep' }, [
      h(Editor, {
        class: 'vuep-editor',
        props: {
          value: this.template,
          options: this.options,
        },
        on: {
          change: [this.executeCode, val => this.executeCode(val)],
        },
      }),
      h(Preview, {
        class: 'vuep-preview',
        props: {
          value: this.preview,
        },
      }),
    ]);
  },

  watch: {
    template: {
      immediate: true,
      handler(val) {
        val && this.executeCode(val);
      },
    },
  },

  methods: {
    executeCode(code) {
      this.error = '';

      this.preview = code;
    },
  },
};
