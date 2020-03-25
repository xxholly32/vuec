<template>
  <div class="code-container">
    <vuec :template="code" @change="change"></vuec>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  name: "SimpleEditor",
  data() {
    return {
      code: ""
    };
  },
  created: function() {
    // eslint-disable-next-line no-useless-escape
    const end = "<\/script>";
    this.code =
      `
    <template>
      <div class="test-style">Hello, {{ name }}!</div>
    </template>

    <style scoped>
      .test-style {
        color: red;
      }
    </style>

    <script>
      export default {
        data: function () {
          return { name: 'Vue' }
        },
        mounted(){
          console.log("start mounted")
        }
      }

    ` + end;
  },
  methods: {
    change(val) {
      console.log(val);
    }
  },
  mounted() {
    // console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
