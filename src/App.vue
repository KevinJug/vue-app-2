<template>
  <div id="app">
    <div id="nav" v-if="currentRouteName !== 'Home'">
      <div class="padding-5-30">
        <router-link to="/price"><img alt="Vue logo" src="./assets/img/JustePrix.png" height="50px"></router-link>
      </div>
      <div class="padding-5-30">
        <router-link to="/pendu"><img alt="Vue logo" src="./assets/img/Pendu.png" height="50px"></router-link>
      </div>
      <div class="padding-5-30">
        <router-link to="/mastermind"><img alt="Vue logo" src="./assets/img/mastermind.png" height="50px"></router-link>
      </div>
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
<style>
  @import "./assets/css/main.css";
</style>
