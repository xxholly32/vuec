<template>
  <div class="hello">
    <vuec :template="code"></vuec>
  </div>
</template>

<script>
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
      <div>Hello, {{ name }}!</div>
    </template>

    <script>
      export default {
        data: function () {
          return { name: 'Vue' }
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
