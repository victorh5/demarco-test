import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import api from '@/plugins/axios'
import { routes } from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogged = store.getters.userIsLogged
  api.defaults.headers.common.Authorization = isLogged !== '' ? `Bearer ${isLogged}` : ''
  if (to.matched.some(record => record.meta.logged)) {
    if (isLogged) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else if (to.name === 'home') {
    if (from.path === '/') {
      if (isLogged) {
        next({ name: 'evaluate' })
      } else next()
    } else next()
  } else next()
})

export default router
