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
        dispatch('loadProfile')
        return dispatch('loadUser')
    },

    async loadProfile({commit, dispatch}, id) {
        try {
            const response = await axios.get('api/profile/' + id)
            commit('setProfile', response.data)
        } catch (e) {
            commit('setProfile', null)
        }
    },
    async saveProfile({commit, dispatch}, id) {
        const response = await axios.post('api/profile/store', {
            userId: id
        })
        dispatch('loadProfile', id)
        return response;
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
            })
            .catch(function (error) {
                console.log(error + 'user.js')
            })
    },
    async loadWrong({commit}, value) {
        commit('setWrong', value)
    },
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
    },
    setProfile(state, value) {
        state.profile = value
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
