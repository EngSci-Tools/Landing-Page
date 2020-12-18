const state = () => ({
  news: []
})

const getters = {
  news: (state) => {
    return state.news
  }
}

const mutations = {
  setNews (state, news) {
    state.news = news
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
