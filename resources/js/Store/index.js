import Vue from 'vue';
import Vuex from 'vuex'
import workouts from './modules/workouts'
import user from './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        workouts,
        user
    }
})

export default store