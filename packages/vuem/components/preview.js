import MarkdownIt from "markdown-it";

export default {
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
