import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Evaluate from '../views/evaluate/Evaluate.vue'
import FormEvaluate from '../views/evaluate/FormEvaluate.vue'
import AnswerEvaluate from '../views/evaluate/AnswerEvaluate.vue'

export const routes = [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: Evaluate,
      meta: { logged: true }
    },
    {
      path: '/form-evaluate',
      name: 'register-evaluate',
      component: FormEvaluate,
      meta: { logged: true }
    },
    {
      path: '/form-evaluate/:id',
      name: 'edit-evaluate',
      component: FormEvaluate,
      meta: { logged: true }
    },
    {
      path: '/answer-evaluate/:id',
      name: 'answer-evaluate',
      component: AnswerEvaluate,
      meta: { logged: true }
    }
  ]