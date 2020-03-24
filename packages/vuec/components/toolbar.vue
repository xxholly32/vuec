<template>
  <div class="code-box-meta">
    <div class="code-box-action">
      <span class="code-box-expand">
        <button collpse @click="changeCode">
          {{ showCode ? "收起编辑" : "展开编辑" }}
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
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
</script>
