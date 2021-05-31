import * as qs from 'qs'

// initial state
const state = () => ({
    sets: []
})

// getters
const getters = {
    sets(state) {
        return state.sets
    }
}

// actions
const actions = {

    async getAllSetsForExercise({commit}, id) {
        const response = await axios.get('api/sets/' + id)
        commit('setSets', response.data)
    },

    async saveSet({commit, state, dispatch}, set) {
        const response = await axios.post('api/sets/store', {
            exerciseId: set.exerciseId,
            set: set.set,
            kg: set.kg,
            reps: set.reps
        })
        dispatch('getAllSetsForExercise', set.exerciseId)
        return response;

    },
}

// mutations
const mutations = {
    setSets(state, sets) {
        state.sets = sets
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
