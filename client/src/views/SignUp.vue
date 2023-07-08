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
            <label for="password">Confirmar Senha</label>
            <input type="password" id="password" v-model="user.confirmPassword">
            <div style="display: grid; gap: 8px;">
                <label>Qual tipo de acesso?</label>
                <div style="display: flex; gap: 8px;">
                    <input type="radio" id="teacher" value="Professor" v-model="user.type">
                    <label for="teacher">Professor</label>
                    <input type="radio" id="student" value="Aluno" v-model="user.type">
                    <label for="student">Aluno</label>
                </div>
            </div>
            <button type="submit">CADASTRAR</button>
        </form>
        <div class="signin">
            <span>Já possui uma conta?</span>
            <router-link :to="{ name: 'home' }">Entre no sistema</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUpView',
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
                console.log('continua')
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

<style scoped>
@import '@/assets/css/views/_signup.css';
</style>