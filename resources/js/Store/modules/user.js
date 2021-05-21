// initial state
const state = () => ({
    authenticated: false,
    user: null,
    wrong: false,
    profile: null
})

// getters
const getters = {
    authenticated(state) {
        return state.authenticated
    },
    user(state) {
        return state.user
    },
    wrong(state) {
        return state.wrong
    },
    profile(state) {
        return state.profile
    }
}

// actions
const actions = {

    async signIn({dispatch}, credentials) {
        await axios.get('/sanctum/csrf-cookie')
        await axios.post('/login', credentials)

        return dispatch('loadUser')
    },

    async signOut({dispatch}) {
        await axios.post('/logout')
        return dispatch('loadUser')
    },

    async loadUser({commit, dispatch}) {
        try {
            const response = (await axios.get("api/user"));
            commit("SET_AUTHENTICATED", true);
            commit("SET_USER", response.data);
        } catch (error) {
            commit("SET_AUTHENTICATED", false);
            commit('SET_USER', null)
            console.log(error)
        }
    },
    async registerUser({dispatch}, credentials) {
        await axios.post('/api/register', credentials)
            .then(function () {
                console.log('user registered')
            })
            .catch(function (error) {
                console.log(error + 'user.js')
            })
    },
    async loadWrong({commit}, value) {
        commit('setWrong', value)
    },
    async makeProfile({commit, dispatch}, id) {

    }
}


// mutations
const mutations = {
    SET_AUTHENTICATED(state, value) {
        state.authenticated = value;
    },
    SET_USER(state, value) {
        state.user = value;
    },
    setWrong(state, value) {
        state.wrong = value;
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
