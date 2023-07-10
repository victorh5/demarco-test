<template>
  <header class="header-tab">
    <img src="@/assets/logo.png" style="width: 150px;">
    <!-- <p style="color: #fff;">{{$store.getters.userIsLogged}}</p> -->
    <demarco-button
      v-if="$store.getters.userIsLogged"
      @callback="handleLogout"
    >Sair do sistema</demarco-button>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import DemarcoButton from './DemarcoButton.vue'

export default {
  components: { DemarcoButton },
  methods: {
    ...mapActions({
      logoutUser: 'logoutUser'
    }),
    handleLogout() {
      this.logoutUser()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-tab {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>