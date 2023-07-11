import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import api from '@/plugins/axios'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: '',
    user_info: {}
  },
  getters: {
    user: (state) => state.user_info,
    userIsLogged: (state) => state.token,
    userIsStudent: (state) => state.user_info.type === 'Aluno'
  },
  mutations: {
    set_user_info(state, payload) {
      state.user_info = payload
    },
    set_token(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async loginUser(context, payload) {
      let url = '/auth/login'
      return api.post(url, payload)
        .then(res => {
          if (res.status === 200) {
            context.commit('set_token', res.data.access_token)
            api.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
            return res.status
          }
        })
        .catch(err => {
          return err.response.status
        })
    },
    logoutUser(context) {
      context.commit('set_token', '')
      context.commit('set_user_info', {})
    }
  },
  plugins: [vuexLocal.plugin]
})
