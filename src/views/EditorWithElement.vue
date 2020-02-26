<template>
  <div class="hello">
    <vuec :template="code"></vuec>
  </div>
</template>

<script>
export default {
  name: "EditorWithElementButton",
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
      <div>
        <el-button @click="handlerClick" type="primary">{{ msg }}</el-button>
      </div>
    </template>

    <script>
      export default {
        data() {
          return {  msg: "Hello, world!" }
        },
        methods:{
          handlerClick(){
            console.log("button click")
          }
        }
      }
  ` + end;
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
