<template>
  <div class="home">
    <h1>Seja bem vindo ao sistema do teste</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul style="padding-left: 40px; margin-top: 4px;">
        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
      </ul>
      </p>
      <label for="email">E-mail</label>
      <input type="text" id="email" v-model="user.email">
      <label for="password">Senha</label>
      <input type="password" id="password" v-model="user.password">
      <demarco-button type="submit" login-button>Entrar</demarco-button>
    </form>
    <div class="account">
      <span>Não tem conta?</span>
      <router-link to="/signup">Cadastre-se</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DemarcoButton from '@/components/DemarcoButton.vue'

export default {
  name: 'HomeView',
  components: { DemarcoButton },
  data: () => ({
    errors: [],
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions({
      loginUser: 'loginUser'
    }),
    async submitForm() {
      this.validForm()
      if (this.errors.length === 0) {
        const result = await this.loginUser(this.user)
        if (result === 200) {
          this.$http.get('/auth/profile')
            .then(res => {
              if (res.status === 200) {
                this.$store.commit('set_user_info', res.data)
              }
            })
            .catch(err => {
              this.$swal({
                icon: 'error',
                title: err
              })
            })
          this.$router.push({ name: 'evaluate' })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Credenciais inválidas'
          })
        }
      }
    },
    validForm() {
      this.errors = []
      if (!this.user.email) {
        this.errors.push('O e-mail é obrigatório')
      }
      if (!this.user.password) {
        this.errors.push('A senha é obrigatória')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_home.scss';
</style>