import Vue from 'vue';
import Vuex from 'vuex'
import workouts from './modules/workouts'
import user from './modules/user'
import exercises from './modules/exercises'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        workouts,
        user,
        exercises
    },
    mutations: {
		initialiseStore(state) {
			// Check if the ID exists
			if(localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
	},
})
store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
});


export default store
