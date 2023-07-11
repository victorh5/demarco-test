<template>
  <div class="form-evaluate">
    <h1>{{ this.title }}</h1>
    <p>{{ this.description }}</p>
    <form @submit.prevent="submitForm" class="evaluate-form">
      <p v-show="errors.length" ref="error" style="margin-top: 16px;">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul style="padding-left: 40px; margin-top: 4px;">
          <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
        </ul>
      </p>
      <div class="important-data">
        <demarco-input
          v-model="evaluate.title"
          label="Titulo"
          id="title"
        />
        <demarco-input
          v-model="evaluate.total_grade"
          label="Nota máxima da avaliação"
          id="totalGrade"
          type="number"
        />
      </div>
      <span>Informe as Questões abaixo:</span>
      <div
        v-for="(q, i) in evaluate.question"
        :key="`question-${i}`"
        class="question"
      >
        <p>{{ i + 1 }}° Questão</p>
        <div class="question-important">
          <demarco-input
            v-model="q.text"
            label="Qual a pergunta?"
            :id="`text-${i + 1}`"
          />
          <demarco-input
            v-model="q.grade"
            label="Qual a nota da questão?"
            :id="`grade-${i + 1}`"
            type="number"
          />
        </div>
        <div
          v-for="(opt, index) in q.options"
          :key="index"
          class="question-options"
        >
          <demarco-input
            v-model="opt.option_text"
            :label="`${index + 1}° alternativa`"
            :id="`alternative-${index}`"
          />
          <demarco-checkbox
            label="Alternativa correta?"
            type="checkbox"
            v-model="opt.is_correct"
          />
        </div>
      </div>
      <demarco-button @callback="addQuestion" class="form-button">Adicionar questão</demarco-button>
      <demarco-button type="submit" style="text-align: right;">{{ this.submitText }}</demarco-button>
    </form>
  </div>
</template>

<script>
import DemarcoInput from '@/components/DemarcoInput.vue';
import DemarcoCheckbox from '@/components/DemarcoCheckbox.vue';
import DemarcoButton from '@/components/DemarcoButton.vue';
export default {
  components: { DemarcoInput, DemarcoCheckbox, DemarcoButton },
  data: () => ({
    title: 'Cadastro de avaliações',
    description: 'Preencha os campos abaixo para cadastrar sua avaliação',
    submitText: 'Cadastrar',
    errors: [],
    ref: null,
    evaluate: {
      title: null,
      total_grade: null,
      answers: [],
      question: [
        {
          text: '',
          grade: null,
          options: [
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
          ]
        }
      ]
    }
  }),
  mounted() {
    if (this.$route.params.id) {
      this.title = 'Edição da avaliação'
      this.description = 'Preencha os campos abaixo para editar a avaliação'
      this.submitText = 'Salvar'
      this.$http.get(`evaluate/${this.$route.params.id}`)
        .then(res => {
          if (res.status === 200) {
            this.evaluate = res.data
          }
        })
    }
  },
  methods: {
    addQuestion() {
      this.evaluate.question.push({
          text: '',
          grade: null,
          options: [
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
            {
              option_text: '',
              is_correct: false
            },
          ]
        })
    },
    submitForm() {
      this.validForm()
      this.verifyGrades()
      this.verifyCorrectAlternatives()

      if (this.errors.length === 0) {
        if (this.$route.params.id) {
          delete this.evaluate._id
          delete this.evaluate.__v
          this.$http.patch(`evaluate/${this.$route.params.id}`, this.evaluate)
            .then(res => {
              if (res.status === 200) {
                alert('Avaliação editada com sucesso')
                this.$router.push({ name: 'evaluate' })
              }
            })
        } else {
          this.$http.post('evaluate', this.evaluate)
            .then(res => {
              if (res.status === 201) {
                alert('Avaliação cadastrada com sucesso')
                this.$router.push({ name: 'evaluate' })
              }
            })
        }
      } else {
        this.$nextTick(() => this.$refs.error.scrollIntoView({ behavior: 'smooth' }))
      }
    },
    validForm() {
      this.errors = []
      if (!this.evaluate.title) {
        this.errors.push('O título da avaliação é obrigatório')
      }
      if (!this.evaluate.total_grade) {
        this.errors.push('A nota máxima da avaliação é obrigatória')
      }
      for (let i=0; i < this.evaluate.question.length; i++) {
        if (!this.evaluate.question[i].text) {
          this.errors.push(`O texto da questão ${i + 1} deve ser informado!`)
        }
        if (!this.evaluate.question[i].grade) {
          this.errors.push(`A nota da questão ${i + 1} deve ser informado!`)
        }
        for (let j=0; j < this.evaluate.question[i].options.length; j++) {
          if (!this.evaluate.question[i].options[j].option_text) {
            this.errors.push(`O texto da alternativa ${j + 1} deve ser informado!`)
          }
        }
      }
    },
    verifyGrades() {
      const total_grade = Number(this.evaluate.total_grade)
      let aux = 0
      this.evaluate.question.forEach(q => {
        aux += Number(q.grade)
      })
      if (total_grade !== aux) {
        this.errors.push(
          'A soma das notas das questões, deve ser igual a nota total da avaliação'
        )
      }
    },
    verifyCorrectAlternatives() {
      let aux = []
      this.evaluate.question.forEach((q, index) => {
        aux[index] = q.options.filter(option => option.is_correct === true)
      })
      aux.forEach((option, idx) => {
        if (option.length > 1) {
          this.errors.push(`Na questão ${idx + 1} deve se escolher apenas uma alternativa correta`)
        }
        if (option.length === 0) {
          this.errors.push(`Na questão ${idx + 1} deve escolher uma alternativa correta`)
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/views/_formEvaluate.scss';
</style>