import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Evaluate from '../views/evaluate/Evaluate.vue'
import FormEvaluate from '../views/evaluate/FormEvaluate.vue'
import AnswerEvaluate from '../views/evaluate/AnswerEvaluate.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogged = store.getters.userIsLogged
  if (to.matched.some(record => record.meta.logged)) {
    if (isLogged) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
})

export default router
