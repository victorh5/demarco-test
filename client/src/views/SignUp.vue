<template>
  <div class="signup">
    <h1>Cadastre sua conta</h1>
    <form @submit.prevent="submitForm" class="signup-form">
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
      <ul style="padding-left: 40px; margin-top: 4px;">
        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
      </ul>
      </p>
      <label for="name">Nome</label>
      <input type="text" id="name" v-model="user.name">
      <label for="email">E-mail</label>
      <input type="text" id="email" v-model="user.email">
      <label for="password">Senha</label>
      <input type="password" id="password" v-model="user.password">
      <label for="confirmPassword">Confirmar Senha</label>
      <input type="password" id="confirmPassword" v-model="user.confirmPassword">
      <div style="display: grid; gap: 8px;">
        <label>Qual tipo de acesso?</label>
        <div style="display: flex; gap: 8px;">
          <input type="radio" id="teacher" value="Professor" v-model="user.type">
          <label for="teacher">Professor</label>
          <input type="radio" id="student" value="Aluno" v-model="user.type">
          <label for="student">Aluno</label>
        </div>
      </div>
      <demarco-button type="submit" login-button>CADASTRAR</demarco-button>
    </form>
    <div class="signin">
      <span>Já possui uma conta?</span>
      <router-link :to="{ name: 'home' }">Entre no sistema</router-link>
    </div>
  </div>
</template>

<script>
import DemarcoButton from '@/components/DemarcoButton.vue'

export default {
  name: 'SignUpView',
  components: { DemarcoButton },
  data: () => ({
    errors: [],
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      type: ''
    }
  }),
  methods: {
    submitForm() {
      this.validForm()
      if (this.errors.length === 0) {
        const data = this.user
        delete data.confirmPassword
        this.$http.post('/users', data)
          .then(res => {
            if (res.status === 201) {
              this.$swal({
                icon: 'success',
                title: 'Usuário cadastrado com sucesso!'
              })
              this.$router.push({ name: 'home' })
            }
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              title: err
            })
          })
      }
    },
    validForm() {
      this.errors = []
      if (!this.user.name) {
        this.errors.push('O nome é obrigatório')
      }
      if (!this.user.email) {
        this.errors.push('O e-mail é obrigatório')
      }
      if (!this.user.password) {
        this.errors.push('A senha é obrigatória')
      }
      if (!this.user.confirmPassword) {
        this.errors.push('A confirmação da senha é obrigatória')
      }
      if (this.user.password !== this.user.confirmPassword) {
        this.errors.push('As senhas não coincidem')
      }
      if (!this.user.type) {
        this.errors.push('Tipo de usuário é obrigatório')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_signup.scss';
</style>