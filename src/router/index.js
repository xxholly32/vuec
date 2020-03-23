import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/simpleEditor",
    name: "SimpleEditor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/vuec/SimpleEditor.vue")
  },
  {
    path: "/editorWithComponent",
    name: "EditorWithComponent",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/vuec/EditorWithComponent.vue"
      )
  },
  {
    path: "/editorWithElement",
    name: "EditorWithElement",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/vuec/EditorWithElement.vue"
      )
  },
  {
    path: "/editorWithComplex",
    name: "EditorWithComplex",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/vuec/EditorWithComplex.vue"
      )
  },
  {
    path: "/editorWithElement",
    name: "EditorWithElement",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/vuec/EditorWithElement.vue"
      )
  },
  {
    path: "/editorWithElementDrag",
    name: "EditorWithElementDrag",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/vuec/EditorWithElementDrag.vue"
      )
  },
  {
    path: "/previewWithCode",
    name: "PreviewWithCode",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/vuec/PreviewWithCode.vue"
      )
  },
  {
    path: "/vuem",
    name: "VuemSimpleEditor",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/vuem/SimpleEditor.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
