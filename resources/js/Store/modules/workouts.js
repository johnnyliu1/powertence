import * as qs from 'qs'

// initial state
const state = () => ({
    workouts: [],
    active: false,
    laravelData: {},
    allWorkouts: [],
    workoutStartTimes: new Map()
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
    },
    getAllWorkouts(state) {
        return state.allWorkouts
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
    async getAll({commit}) {
        axios.get('api/workouts/all')
            .then(response => {
                this.allWorkouts = response.data;
                commit('setAllWorkouts', response.data)
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
    },
    addWorkoutStartTime({commit, state}, value) {
      commit('setWorkoutStartTime', value )
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
    },
    setWorkoutStartTime(state, workoutId) {
        state.workoutStartTimes.set(workoutId, new Date())
    },
    setAllWorkouts(state, workouts) {
        state.allWorkouts = workouts
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
