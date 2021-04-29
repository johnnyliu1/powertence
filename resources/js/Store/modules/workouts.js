
// initial state
const state = () => ({
  workouts: [],
  test: 'first version'
})

// getters
const getters = {
  test (state) {
    return state.test
  },
  workouts (state) {
    return state.workouts
  }
}

// actions
const actions = {
  async getAllWorkouts ({ commit }) {
    const response = await axios.get('/api/workouts')
    commit('setWorkouts', response.data)
    console.log(response.data)
  },
   getTest ({ commit }) {
    let text = 'dit is de state text'
    commit('setTest', text)
    console.log('de test is gezet')
  }
}

// mutations
const mutations = {
  setWorkouts (state, workouts) {
    state.workouts = workouts
  },
  setTest (state, text) {
    state.test = text
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}