<template>
  <div id="app" class="main-container">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/simpleEditor">SimpleEditor</router-link>|
      <router-link to="/editorWithComponent">EditorWithComponent</router-link>|
      <router-link to="/editorWithElement">EditorWithElement</router-link>|
      <router-link to="/editorWithComplex">EditorWithComplex</router-link>|
      <router-link to="/previewWithCode">PreviewWithCode</router-link>|
      <router-link to="/vuem">vuem</router-link>|
      <!-- <router-link to="/editorWithElementDrag"
        >EditorWithElementDrag</router-link
      >| -->
    </div>
    <router-view />
  </div>
</template>

<style>
html,
body {
  /* height: 100%; */
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.main-container {
  display: flex;
  flex-direction: column;
}
</style>
