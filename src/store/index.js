import Vue from 'vue'
import Vuex from 'vuex'

import courses from './modules/courses'
import news from './modules/news'
import digest from './modules/digest'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    courses,
    news,
    digest
  },
  state: {
    isConnected: false
  },
  mutations: {
    setConnected (state, connected) {
      state.isConnected = connected
    }
  },
  actions: {
    SOCKET_connect ({ commit }) {
      commit('setConnected', true)
    },
    SOCKET_disconnect ({ commit }) {
      commit('setConnected', false)
    },
    SOCKET_courses ({ commit }, courses) {
      commit('courses/setCourses', courses)
    },
    SOCKET_news ({ commit }, news) {
      commit('news/setNews', news)
    },
    SOCKET_digest ({ commit }, digest) {
      commit('digest/setDigest', digest)
    }
  },
  strict: debug
})
