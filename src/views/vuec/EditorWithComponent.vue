<template>
  <div class="code-container">
    <vuec :template="code"></vuec>
  </div>
</template>

<script>
export default {
  name: "EditorWithComponent",
  data() {
    return {
      code: ""
    };
  },
  created: function() {
    // 需要转译一下，这里还不是特别好的解法
    // eslint-disable-next-line no-useless-escape
    const end = "<\/script>";
    this.code =
      `
      <template>
        <hello-world :msg="message"></hello-world>
      </template>

      <script>
        export default {
          data () {
            return {
              message: "Welcome to Your Vue.js App"
            }
          }
        }` + end;
  }
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
