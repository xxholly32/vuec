# vuec

## 介绍

根据 script 生成 vue 单文件实例的组件

由于生产需要，所以想单独根据文件的内容来生成编译时和发布态的单文件 vue 组件，思路来源与 vuep 框架，不同的是这个是用单文件字符串生成的实例；vuep 可以完全用于编译态的实现。

主要目标：实现模版渲染以及简单的数据赋值

### 主要思路

利用 vue-template-compiler 解析单文件，对于 template 的文件利用 createElement 来实现，对于数据端以及 js 逻辑端展示，采用 mine-jsjs 进行解析，对于部分数据进行单项绑定；简单事件可以正常处理（比如 console）；现阶段对于简单的页面可以做到基本正常显示，并实时动态修改；

为什么不用 vuep；

引入组件比较麻烦，需要将一些组件做成 umd 格式；其次，为了做到渲染的时候可以在做一些逻辑处理，vuep 是一个黑盒，完全是一个全新的 vue 实例；

## hello world 实例

```vue
<template>
  <vuec :template="code"></vuec>
</template>
<script>
export default {
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
```

### 在线实例

```
yarn install
yarn run serve
```

### 测试

```
yarn run unit:test
```

### TODO

- [ ] 更多复杂实例测试，完善 render 代码
  - [ ] 样式引入 （已支持 postcss）
  - [ ] import 引入方案实现 (这个估计无法支持了)
  - [ ] 如何引入 mock 数据
- [ ] vuec 报错信息 （现在统一打印在 console，包括 vue 的错误信息）
- [ ] 代码优化
- [ ] rollup 打包

* [ ] 设计 md 编辑器
