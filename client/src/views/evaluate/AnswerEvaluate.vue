<template>
  <div class="answer-evaluate">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h1>{{ this.evaluate.title }}</h1>
      <p>Data: {{ this.getDay }}</p>
    </div>
    <form @submit.prevent="submitForm" class="evaluate-form">
      <p v-show="errors.length" ref="error" style="margin-top: 16px;">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul style="padding-left: 40px; margin-top: 4px;">
          <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
        </ul>
      </p>
      <div
        v-for="(question, idx) in this.evaluate.question"
        :key="question._id"
      >
        <p>{{idx + 1}}° - {{ question.text }}</p>
        <div
          style="display: flex; gap: 8px; padding-left: 8px;"
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
    this.$http.get(`evaluate/${this.$route.params.id}`)
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
      this.$swal({
        icon: 'success',
        title: `Sua nota foi: ${totalGrade}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_answerEvaluate.scss';
</style>