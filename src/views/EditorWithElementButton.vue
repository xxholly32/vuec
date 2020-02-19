<template>
  <div class="hello">
    <vuep :template="code" :scope="scope"></vuep>
  </div>
</template>

<script>
import { Button } from 'element-ui'; // Import component
export default {
  name: 'EditorWithElementButton',
  data() {
    return {
      scope: { ElButton: Button },
      code: '',
    };
  },
  created: function() {
    this.code = `
<template>
  <div>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
  module.exports = {
    components: {
      ElButton
    }
  }`;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
