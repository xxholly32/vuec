<template>
  <div class="code-container">
    <vuem :template="code" @change="change"></vuem>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  name: "VuemSimpleEditor",
  data() {
    return {
      code: ""
    };
  },
  created: function() {
    this.code = `# 这是标题 1

## 这是标题 2`;
  },
  methods: {
    change(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped></style>
