<template>
  <div id="app">
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: { Footer }
}
</script>


<style>
#app {
  height: 100vh;
  display: flex;
  position: relative;
  background-color: #212121;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
