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
            <button type="submit">Entrar</button>
        </form>
        <div class="account">
            <span>Não tem conta?</span>
            <router-link to="/signup">Cadastre-se</router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomeView',
    data: () => ({
        errors: [],
        user: {
            email: '',
            password: ''
        }
    }),
    methods: {
        submitForm() {
            this.validForm()
            if (this.errors.length !== 0) {
                console.log('continua')
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

<style scoped>
@import '@/assets/css/views/_home.css';
</style>