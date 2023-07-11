<template>
  <div class="evaluate">
    <h1>Seja bem vindo, {{ this.$store.state.user_info.name }}</h1>
    <p v-if="!$store.getters.userIsStudent">Abaixo está as avaliações já cadastradas no sistema:</p>
    <p v-else>Abaixo está as avaliações não respondidas por você:</p>
    <div class="register-button" v-if="!$store.getters.userIsStudent">
      <demarco-button @callback="$router.push({ name: 'register-evaluate' })">Cadastrar Avaliação</demarco-button>
    </div>
    <table >
      <tr>
        <th>Titulo</th>
        <th>Qtd de questões</th>
        <th v-if="!$store.getters.userIsStudent">Qtd de respostas</th>
        <th>Nota máxima</th>
        <th>Ações</th>
      </tr>
      <tr v-for="evaluate in evaluations" :key="evaluate._id">
        <td>{{ evaluate.title }}</td>
        <td>{{ evaluate.question.length }}</td>
        <td v-if="!$store.getters.userIsStudent">{{ evaluate.answers.length }}</td>
        <td>{{ evaluate.total_grade }}</td>
        <td style="display: flex; gap: 8px;">
          <demarco-button @callback="handleEdit(evaluate._id)" v-if="!$store.getters.userIsStudent">Editar</demarco-button>
          <demarco-button @callback="handleRemove(evaluate._id)" v-if="!$store.getters.userIsStudent">Deletar</demarco-button>
          <demarco-button @callback="handleAnswer(evaluate._id)" v-else>Responder avaliação</demarco-button>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import DemarcoButton from '@/components/DemarcoButton.vue'
export default {
  components: { DemarcoButton },
  data: () => ({
    evaluations: []
  }),
  mounted() {
    this.loadEvaluations()
  },
  methods: {
    loadEvaluations() {
      this.$http.get('evaluate')
        .then(res => {
          if (res.status === 200) {
            this.evaluations = res.data
          }
        })
    },
    handleEdit(id) {
      this.$router.push({ name: 'edit-evaluate', params: { id }})
    },
    handleAnswer(id) {
      this.$router.push({ name: 'answer-evaluate', params: { id }})
    },
    handleRemove(id) {
      this.$http.delete(`evaluate/${id}`)
        .then(res => {
          if (res.status === 200) {
            alert('Avaliação removida com sucesso!')
            const index = this.evaluations.findIndex(evaluation => evaluation._id === id)
            if (index > -1) {
              this.evaluations.splice(index, 1)
            }
          }
        })
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_evaluate.scss';
</style>