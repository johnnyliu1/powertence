
// initial state
const state = () => ({
  isLoggedIn: false,
  user: {}
})

// getters
const getters = {
    isLoggedIn (state) {
        return state.isLoggedIn
    },
    user (state) {
      return state.user
    }
}

// actions
const actions = {
      async loadUser({ commit, dispatch }) {
            try {
                const user = (await axios.get("api/user")).data;
                commit("setUser", user);
                commit("setLoggedIn", true);
            } catch (error) {
              console.log('isLoggedIn is false')
                console.log(error)
            }
        }
}

// mutations
const mutations = {
  setLoggedIn(state, value) {
    state.isLoggedIn = value;
},
    setUser(state, value) {
        state.user = value;
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}