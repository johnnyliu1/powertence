<template>
    <div class="container">
        <div class="mt-4 mb-2">
            <h1>Dashboards</h1>
            {{ authenticated }}
            {{ user }}
            <b-container>
                <b-row>
                    <b-col sm="12" md="6">
                        test
                    </b-col>
                    <b-col sm="12" md="6">
                        test
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="12" md="6">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">View</th>
                            </tr>
                            </thead>
                            <tbody v-for="workout in workouts">
                            <tr>
                                <td>{{ workout.name }}</td>
                                <td>{{ workout.created_at | moment }}</td>
                                <td>{{ workout.betweenTime | timeBetween }}</td>
                                <td>
                                    <b-button size="sm" @click="toggleDetail(workout.id)" variant="primary">View {{workout.id}}</b-button>
                                    <b-modal :id="workout.id" size="lg" hide-footer :title="workout.name">
                                        <workout-detail :workoutId="workout.id"></workout-detail>
                                    </b-modal>
                                </td>
                            </tr>
                            </tbody>

                        </table>
                    </b-col>
                    <b-col sm="12" md="6">
                        test
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters, mapMutations,
    mapState
} from "vuex";
import moment from "moment";

export default {
    mounted() {
        console.log("dashboard mounted");
    },
    filters: {
        moment(date) {
            return moment(date).format('Do MMM YYYY')
        },
        timeBetween(date) {
            return moment(date).format('h:mm:ss')
        }
    },
    data() {
        return {
            user_id: this.$store.state.user.user.id,
            workout_id: null,
            show: false,
            showWorkout: []
        }
    },
    created() {
        this.$store.dispatch('workouts/getAll', this.user_id);
        console.log(this.workouts + 'workouts')
        if (this.authenticated === false) {
            this.$router.push('/signin')
        }
        if (this.authenticated === true) {
            this.$store.dispatch('user/loadProfile', this.user_id)
        }
    },
    computed: {
        ...mapGetters('user', [
            'authenticated',
            'user',
            'profile'
        ]),
        ...mapGetters('workouts', [
            'workouts',
        ]),
        ...mapState('workouts', [
            'workouts',
        ]),
    },
    methods: {
        ...mapActions('workouts', [
            'getAll',
            'getResults',
        ]),
        ...mapMutations('workouts', [
            'setWorkouts'
        ]),
        async toggleDetail(id) {
            this.workout_id = id
            console.log(this.workout_id)
            this.$bvModal.show(this.workout_id)
        },
    }
}
</script>

<style>

</style>
