<template>
  <div class="hello">
    <vuep :template="code" :scope="scope"></vuep>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import Features from '@/components/Features'; // Import component
export default {
  name: 'EditorWithComponent',
  data() {
    return {
      scope: { Features, HelloWorld },
      code: '',
    };
  },
  created: function() {
    this.code = `
<template>
  <div>
    <features :features="features"></features>
    <hello-world msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  module.exports = {
    components: {
      Features,
      HelloWorld
    },
    data () {
      return {
        features: [
          'Single File Component',
          'Babel for ES6/JSX/UMD/CommonJS',
          'Scoped style',
          'Customizable JavaScript scope'
        ]
      }
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
