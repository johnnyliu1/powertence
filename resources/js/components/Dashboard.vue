<template>
    <div class="container">
        <div class="mt-4 mb-2">
            <h1>Dashboards</h1>
            {{ authenticated }}
            {{ user }}
            {{ workouts }}
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
                                    <b-button size="sm" @click="toggleDetail(workout.id)" variant="primary">View
                                    </b-button>
                                    <b-modal :id="workout.id" size="lg" hide-footer>
                                        <workout-detail :workoutId="workout.id"></workout-detail>
                                    </b-modal>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </b-col>
                    <b-col sm="12" md="6">
                        <b-form-select v-model="selected" @change="changeData()" size="sm" class="mt-3">
                            <option v-for="(workout, workoutIndex) in workouts" :key="workout.id" :value="workout.id">
                                {{workout.name}}
                            </option>
                        </b-form-select>
                        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>

                        <b-form-select v-if="exercises.length" v-model="selectedExercises" @change="" size="sm" class="mt-3">
                            <option v-for="(exercise, exerciseIndex) in exercises" :key="exercise.id" :value="exercise.id">
                                {{exercise.name}}
                            </option>
                        </b-form-select>
                        <div class="mt-3">Selected: <strong>{{ selectedExercises }}</strong></div>

                        <line-chart :chartdata="this.chartdata" :options="this.options"></line-chart>
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
import LineChart from './LineChart';

export default {
    components: {
        LineChart
    },
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
    created() {
        if (this.authenticated === false) {
            this.$router.push('/signin')
        }
        if (this.authenticated === true) {
            this.$store.dispatch('workouts/getAll', this.user_id);
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
            'single'
        ]),
        ...mapGetters('exercises', [
            'exercises'
        ])
    },
    data() {
        return {
            user_id: this.$store.state.user.user.id,
            workout_id: null,
            show: false,
            showWorkout: [],
            selected: null,
            selectedExercises: null,
            loaded: false,
            chartdata: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Afternoon workout',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                },
                    {
                        label: 'Morning workout',
                        data: [45, 18, 34, 10, 2, 45],
                        borderWidth: 1
                    },
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        }
    },
    methods: {
        ...mapActions('workouts', [
            'getAll',
            'getSingle'
        ]),
        ...mapActions('exercises', [
            'getAllExercisesForWorkout'
        ]),
        ...mapMutations('workouts', [
            'setWorkouts',
            'setSingleWorkout'
        ]),
        ...mapMutations('exercises', [
            'setExercises'
        ]),
        async toggleDetail(id) {
            this.workout_id = id
            this.$bvModal.show(this.workout_id)
        },
        changeData() {
            console.log('select changed' + this.selected)
            this.$store.dispatch('exercises/getAllExercisesForWorkout', this.selected)
            console.log(this.exercises)
        }
    }
}
</script>

<style>
.small {
    max-width: 600px;
    margin: 150px auto;
}
</style>
