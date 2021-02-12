<template>
  <div id="app">
    <div id="nav">
      {{currentRouteName}}
      <router-link to="/">Home</router-link> |
      <router-link to="/price">Price</router-link>|
      <router-link to="/pendu">Pendu</router-link>|
      <router-link to="/mastermind">Mastermind</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app',
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>
