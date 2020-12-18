const state = () => ({
  digest: []
})

const getters = {
  digest: (state) => {
    return state.digest
  }
}

const mutations = {
  setDigest (state, digest) {
    state.digest = digest
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
