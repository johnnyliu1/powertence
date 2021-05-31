import * as qs from 'qs'

// initial state
const state = () => ({
    exercises: [],
    singleExercise: []
})

// getters
const getters = {
    exercises(state) {
        return state.exercises
    },
    exercise(state) {
        return state.singleExercise
    }
}

// actions
const actions = {

    async getAllExercisesForWorkout({commit}, id) {
        const response = await axios.get('api/exercises/' + id)
        commit('setExercises', response.data)
    },
    async getSingleExercise({commit, state}, id) {
        axios.get('api/exercises/single/' + id)
            .then(response => {
                this.singleExercise = response.data;
                commit('setSingleExercise', response.data)
            })
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
    setSingleExercise(state, singleExercise) {
        state.singleExercise = singleExercise
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
