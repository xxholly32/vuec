<template>
  <div class="code-box-meta">
    <div class="code-box-action">
      <span class="code-box-expand">
        <img
          src="./image/code-not-open.svg"
          v-show="!showCode"
          @click="changeCode"
          alt="expand code"
        />
        <img
          src="./image/code-open.svg"
          v-show="showCode"
          @click="changeCode"
          title="收起代码"
          alt="collpse code"
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {
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
</script>

<style scoped>
.code-box-action {
  width: 100%;
  text-align: center;
}

.code-box-action img {
  cursor: pointer;
  width: 16px;
  height: 16px;
}
</style>
