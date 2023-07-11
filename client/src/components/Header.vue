<template>
  <header class="header-tab">
    <img src="@/assets/logo.png" style="width: 150px;">
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
@import '@/assets/scss/components/_header.scss';
</style>