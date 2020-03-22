<template>
  <div class="main">
    <h1>Hello, world!</h1>
    <h2>介绍</h2>

    <p>根据 script 生成 vue 单文件实例的组件</p>

    <p>
      由于生产需要，所以想单独根据文件的内容来生成编译时和发布态的单文件 vue
      组件，思路来源与 vuep 框架，不同的是这个是用单文件字符串生成的实例；vuep
      可以完全用于编译态的实现。
    </p>

    <p>主要目标：实现模版渲染以及简单的数据赋值</p>

    <h3>主要思路</h3>

    <p>
      利用 vue-template-compiler 解析单文件，对于 template 的文件利用
      createElement 来实现，对于数据端以及 js 逻辑端展示，采用 mine-jsjs
      进行解析，对于部分数据进行单项绑定；简单事件可以正常处理（比如
      console）；现阶段对于简单的页面可以做到基本正常显示，并实时动态修改；
    </p>

    <h3>为什么不用 vuep；</h3>

    <p>
      引入组件比较麻烦，需要将一些组件做成 umd
      格式；其次，为了做到渲染的时候可以在做一些逻辑处理，vuep
      是一个黑盒，完全是一个全新的 vue 实例；
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  text-align: center;
  width: 600px;
}
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
