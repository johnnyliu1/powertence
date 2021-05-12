import * as qs from 'qs'

// initial state
const state = () => ({
    workouts: [],
    laravelData: {}
})

// getters
const getters = {
    workouts(state) {
        return state.workouts
    },
    laravelData(state) {
        return state.laravelData
    }
}

// actions
const actions = {

    /*    async getAllWorkouts({commit}) {
            const response = await axios.get('/api/workouts')
            commit('setWorkouts', response.data)
            commit('setLaravelData', response.data)
            console.log(response.data)
        },*/
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
}


// mutations
const mutations = {
    setWorkouts(state, workouts) {
        state.workouts = workouts
    },
    setLaravelData(state, workouts) {
        state.laravelData = workouts
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
