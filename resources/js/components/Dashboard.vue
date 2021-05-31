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
                        <b-form-select v-model="selected" @change="changeWorkout()" size="sm" class="mt-3">
                            <option v-for="(workout, workoutIndex) in workouts" :key="workout.id" :value="workout.id">
                                {{ workout.name }}
                            </option>
                        </b-form-select>
                        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>

                        <b-form-select v-if="exercises.length" v-model="selectedExercises" @change="changeExercise()"
                                       size="sm" class="mt-3">
                            <option v-for="exercise in exercises" :key="exercise.id" :value="exercise.id">
                                {{ exercise.name }}
                            </option>
                        </b-form-select>
                        <div class="mt-3">Selected: <strong>{{ selectedExercises }}</strong></div>
                        <b-button @click="addDataToChart()">Add chart</b-button>
                        <line-chart :key="componentKey" :chartData="this.chartData"
                                    :options="this.options"></line-chart>
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
            this.$store.dispatch('user/loadProfile', this.user_id);
            this.$store.dispatch('exercises/getSingleExercise', this.selectedExercises)
        }
        this.chartData.datasets.push({
            label: 'test',
            data: [1, 2, 3, 4, 5],
            borderWidth: 1
        })
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
            'exercises',
            'exercise'
        ]),
        ...mapGetters('sets', [
            'sets'
        ])
    },
    data() {
        return {
            user_id: this.$store.state.user.user.id,
            workout_id: null,
            show: false,
            showWorkout: [],
            selected: null,
            test: null,
            selectedExercises: null,
            componentKey: 0,
            selectedExerciseName: null,
            chartData: {
                labels: ['Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5', 'Set 6'],
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
            'getAllExercisesForWorkout',
            'getSingleExercise'
        ]),
        ...mapMutations('workouts', [
            'setWorkouts',
            'setSingleWorkout'
        ]),
        ...mapMutations('exercises', [
            'setExercises',
            'setSingleExercise'
        ]),
        async toggleDetail(id) {
            this.workout_id = id
            this.$bvModal.show(this.workout_id)
        },
        changeWorkout() {
            this.$store.dispatch('exercises/getAllExercisesForWorkout', this.selected)

        },
        changeExercise() {
            this.$store.dispatch('sets/getAllSetsForExercise', this.selectedExercises)
            this.$store.dispatch('exercises/getSingleExercise', this.selectedExercises)
            console.log(this.exercises)
            console.log(this.exercise)
        },
        forceRerender() {
            this.componentKey += 1;
        },
        addDataToChart() {
            if (this.selected !== null && this.selectedExercises !== null) {
                let i;
                let selectedData = [];
                for (i = 0; i < this.sets.length; i++) {
                    selectedData.push(this.sets[i].kg)
                }
                console.log('aantal sets = ' + this.sets.length)
                console.log('aantal sets in graph = ' + this.chartData.labels.length)
                console.log(this.exercises)
                if (this.chartData.labels.length < this.sets.length) {
                    this.chartData.labels = []
                    let k;
                    for (k = 1; k < this.sets.length + 1; k++) {
                        this.chartData.labels.push('Set ' + k)
                    }
                    this.chartData.datasets.push({
                        label: this.exercise.name,
                        data: selectedData,
                        borderWidth: 1
                    })
                } else {
                    this.chartData.datasets.push({
                        label: this.exercise.name,
                        data: selectedData,
                        borderWidth: 1
                    })
                }

                this.forceRerender()

            } else {
                this.$bvToast.toast('Please select a workout and exercise to add to the graph', {
                    title: 'Error',
                    variant: 'danger',
                    autoHideDelay: 5000,
                })
            }
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
