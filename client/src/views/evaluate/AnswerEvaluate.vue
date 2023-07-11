<template>
  <div class="answer-evaluate">
    <div class="answers-header">
      <h1>{{ this.evaluate.title }}</h1>
      <p>Data: {{ this.getDay }}</p>
    </div>
    <form @submit.prevent="submitForm" class="evaluate-form">
      <div
        v-for="(question, idx) in this.evaluate.question"
        :key="question._id"
      >
        <p>{{idx + 1}}° - {{ question.text }}</p>
        <div
          class="question-options"
          v-for="(option, i) in question.options"
          :key="i"
        >
          <input type="radio" :id="`option-${idx}-${i}`" :value="option.option_text" v-model="answers[idx]">
          <label :for="`option-${idx}-${i}`">{{ option.option_text }}</label>
        </div>
      </div>
      <demarco-button type="submit" style="text-align: right;">Enviar respostas</demarco-button>
    </form>
  </div>
</template>

<script>
import DemarcoButton from '@/components/DemarcoButton.vue'
export default {
  components: { DemarcoButton },
  data: () => ({
    evaluateId: '',
    errors: [],
    evaluate: {},
    answers: []
  }),
  computed: {
    getDay() {
      const day = new Date().getDate()
      const month = new Date().getMonth()
      const year = new Date().getFullYear()
      return `${day}/${month}/${year}`
    }
  },
  mounted() {
    this.evaluateId = this.$route.params.id
    this.$http.get(`evaluate/${this.evaluateId}`)
      .then(res => {
        if (res.status === 200) {
          this.evaluate = res.data
          this.evaluate.question.forEach(() => this.answers.push(''))
        }
      })
  },
  methods: {
    submitForm() {
      function getTotalGrade(array) {
        return array.reduce((sum, a) => sum + a, 0)
      }
      let aux = []
      this.evaluate.question.forEach((question, index) => {
        question.options.forEach(option => {
          if (option.option_text === this.answers[index] && option.is_correct === true) {
            aux.push(question.grade)
          }
        })
      })
      const totalGrade = getTotalGrade(aux)
      let arrayData = [
        ...this.evaluate.answers,
        {
          user: this.$store.getters.user,
          user_grade: totalGrade
        }
      ]
      this.$http.patch(`evaluate/${this.evaluateId}`, { answers: arrayData })
        .then(res => {
          if (res.status === 200) {
            this.$swal({
              icon: 'success',
              title: 'Respostas submetidas',
              text: `Nesta avaliação sua nota foi: ${totalGrade}! Obrigado por realizar a avaliação...`
            })
            this.$router.push({ name: 'evaluate' })
          }
        })
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_answerEvaluate.scss';
</style>