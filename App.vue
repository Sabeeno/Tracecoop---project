<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>
      <router-link to="/">Home</router-link>&nbsp;
      <router-link to="/createcar">Create Car</router-link>&nbsp;
      <router-link to="/changecarowner">Change Car Owner</router-link>&nbsp;
      <router-link to="/queryallcar">Query All Cars</router-link>&nbsp;
      <router-link to="/query">Query Car Key</router-link>&nbsp;
      <router-link to="/query/make">Query Car Make</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
