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
        <th v-if="$store.getters.userIsStudent">Nota obtida</th>
        <th>Ações</th>
      </tr>
      <tr v-for="evaluate in evaluations" :key="evaluate._id">
        <td>{{ evaluate.title }}</td>
        <td>{{ evaluate.question.length }}</td>
        <td v-if="!$store.getters.userIsStudent">{{ evaluate.answers.length }}</td>
        <td>{{ evaluate.total_grade }}</td>
        <td v-if="$store.getters.userIsStudent">{{ studentGrade(evaluate.answers) }}</td>
        <td style="display: flex; gap: 8px;">
          <demarco-button @callback="$router.push({ name: 'edit-evaluate', params: { id: evaluate._id } })" v-if="!$store.getters.userIsStudent">Editar</demarco-button>
          <demarco-button @callback="handleRemove(evaluate._id)" v-if="!$store.getters.userIsStudent">Deletar</demarco-button>
          <demarco-button
            @callback="$router.push({ name: 'answer-evaluate', params: { id: evaluate._id } })"
            v-if="$store.getters.userIsStudent && !alreadyAnswered(evaluate)"
          >Responder avaliação</demarco-button>
          <p v-if="alreadyAnswered(evaluate)">Avaliação já respondida</p>
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
    this.$http.get('evaluate')
      .then(res => {
        if (res.status === 200) {
          this.evaluations = res.data
        }
      })
  },
  methods: {
    handleRemove(id) {
      this.$http.delete(`evaluate/${id}`)
        .then(res => {
          if (res.status === 200) {
            this.$swal({
              icon: 'success',
              title: 'Avaliação removida com sucesso!'
            })
            const index = this.evaluations.findIndex(evaluation => evaluation._id === id)
            if (index > -1) {
              this.evaluations.splice(index, 1)
            }
          }
        })
        .catch(err => {
          this.$swal({
            icon: 'error',
            title: err
          })
        })
    },
    alreadyAnswered(evaluate) {
      const isAnswered = evaluate.answers.filter(answer => answer.user === this.$store.getters.user._id)
      return isAnswered[0] ?? false
    },
    studentGrade(answer) {
      if (answer.length > 0) {
        if (answer[0].user === this.$store.getters.user._id) {
          return answer[0].user_grade
        } else return 'Avaliação não respondida'
      } else return 'Avaliação não respondida'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_evaluate.scss';
</style>