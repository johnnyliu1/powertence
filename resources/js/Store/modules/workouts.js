import * as qs from 'qs'

// initial state
const state = () => ({
    workouts: [],
    active: false,
    singleWorkout: [],
    laravelData: {},
    allWorkouts: [],
    everyWorkouts: [],
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
    single(state) {
        return state.singleWorkout
    },
    allWorkouts(state) {
        return state.everyWorkouts
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
    async getAllWorkouts({commit, state}, id) {
        console.log('getallWorkouts called')
        axios.get('api/workouts/getAll/' + id)
            .then(response => {
                this.everyWorkouts = response.data;
                commit('setAllWorkouts', response.data)
            });
    },
    async getAll({commit, state}, id) {
        axios.get('api/workouts/all/' + id)
            .then(response => {
                this.workouts = response.data;
                commit('setWorkouts', response.data)
                console.log("my object: %o", response)
            });
    },
    async getSingle({commit, state}, id) {
        axios.get('api/workouts/' + id)
            .then(response => {
                this.singleWorkout = response.data;
                commit('setSingleWorkout', response.data)
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
        commit('setWorkoutStartTime', value)
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
    setSingleWorkout(state, workout) {
        state.singleWorkout = workout
    },
    setAllWorkouts(state, workouts) {
        state.everyWorkouts = workouts
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
