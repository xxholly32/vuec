<template>
  <div class="hello">
    <vuec :template="code"></vuec>
  </div>
</template>

<script>
export default {
  name: 'EditorWithComponent',
  data() {
    return {
      code: '',
    };
  },
  created: function() {
    // eslint-disable-next-line no-useless-escape
    const end = '<\/script>';
    this.code =
      `
<template>
  <div>
    <hello-world :msg="msg" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: "Welcome to Your Vue.js App11"
      }
    }
  }` + end;
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
