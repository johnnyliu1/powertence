import * as qs from 'qs'

// initial state
const state = () => ({
    workouts: [],
    active: false,
    laravelData: {},
})

// getters
const getters = {
    workouts(state) {
        return state.workouts
    },
    laravelData(state) {
        return state.laravelData
    },
    active(state) {
        return state.active
    }
}

// actions
const actions = {
    async getResults({commit}, page = 1) {
        axios.get('api/workouts?page=' + page)
            .then(response => {
                this.laravelData = response.data;
                commit('setLaravelData', response.data)
            });
    },
    async deleteWorkout({commit, state}, id) {
        console.log(id)
        try {
            const response = await axios.delete('api/workouts/delete/' + id)
        } catch (e) {
            console.log(e)
        }
    },
    activate({commit, state}, value) {
        commit('setActive', value)
    }
}


// mutations
const mutations = {
    setWorkouts(state, workouts) {
        state.workouts = workouts
    },
    setLaravelData(state, workouts) {
        state.laravelData = workouts
    },
    setActive(state, toggle) {
        state.active = toggle
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
