import * as qs from 'qs'

// initial state
const state = () => ({
    exercises: []
})

// getters
const getters = {
    exercises(state) {
        return state.exercises
    }
}

// actions
const actions = {

    async getAllExercisesForWorkout({commit}, id) {
        const response = await axios.get('api/exercises/' + id)
        commit('setExercises', response.data)
        console.log(response.data)
    },

    async saveExercise({commit, state, dispatch}, exercise) {
            console.log(exercise)
           const response = await axios.post('api/exercises/store', {
                name: exercise.name,
                workoutId: exercise.workoutId
            })
        dispatch('getAllExercisesForWorkout', exercise.workoutId)
        return response;

    },
}

// mutations
const mutations = {
    setExercises(state, exercises) {
        state.exercises = exercises
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
