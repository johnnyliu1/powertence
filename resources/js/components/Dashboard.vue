<template>
    <div class="container">
        <div class="mt-4 mb-2">
            <h1 class="centered">Dashboard</h1>
            <!--        {{ authenticated }}
                        {{ user }}
                        {{ workouts }}-->
            <b-container class="p-0">
                <b-row>
                    <b-col sm="12" md="6" class="centered">
                        <div>
                            <b-jumbotron>
                                <h2>Hi, {{user.name}}!</h2>
                                <p>Check your statistics from previous workouts here.</p>
                                <hr>
                                <b-button size="sm"
                                          variant="primary">
                                    <router-link class="menuItem m-1" to="/workouts">Workouts</router-link>
                                </b-button>

                                <b-button size="sm"
                                          variant="primary">
                                    <router-link class="menuItem m-1" to="/profile">Profile</router-link>
                                </b-button>
                            </b-jumbotron>
                        </div>
                    </b-col>
                    <b-col sm="12" md="6">
                        test
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="12" md="6" align-self="stretch">
                        <b-jumbotron class="p-4 ">
                            <h4>Previous workouts</h4>
                            <hr>
                            <div class="table-responsive-sm">
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
                            </div>
                        </b-jumbotron>
                    </b-col>

                    <b-col sm="12" md="6">
                        <b-jumbotron class="p-4">
                            <h4>Charts</h4>
                            <hr>
                            <div class="row">
                                <div class="col-6">
                                    <label>Select workout</label>
                                    <b-form-select v-model="selected" @change="changeWorkout()" size="sm">
                                        <option v-for="(workout, workoutIndex) in workouts" :key="workout.id"
                                                :value="workout.id">
                                            {{ workout.name }} / {{workout.created_at | moment}}
                                        </option>
                                    </b-form-select>
                                </div>
                                <div class="col-6">
                                    <div v-if="exercises.length">
                                        <label>Select Exercise</label>
                                        <b-form-select v-model="selectedExercises"
                                                       @change="changeExercise()"
                                                       size="sm">
                                            <option v-for="exercise in exercises" :key="exercise.id"
                                                    :value="exercise.id">
                                                {{ exercise.name }}
                                            </option>
                                        </b-form-select>
                                    </div>
                                </div>
                            </div>

                            <!--                        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                                                    <div class="mt-3">Selected: <strong>{{ selectedExercises }}</strong></div>-->
                            <b-button size="sm" class="mt-2 mb-2" @click="addDataToChart()">Add chart</b-button>
                            <line-chart :key="componentKey" :chartData="this.chartData"
                                        :options="this.options"></line-chart>
                        </b-jumbotron>
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
            this.selectedExercises = null
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
            graphList: [],
            selectedExerciseName: null,
            chartData: {
                labels: ['Set 1', 'Set 2', 'Set 3', 'Set 4', 'Set 5', 'Set 6'],
                datasets: []
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
            this.selectedExercises = null;

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
                if (!this.graphList.includes(this.exercise.id)) {
                    if (this.chartData.labels.length < this.sets.length) {
                        this.chartData.labels = []
                        let k;
                        for (k = 1; k < this.sets.length + 1; k++) {
                            this.chartData.labels.push('Set ' + k)
                        }
                        var dynamicColors = function () {
                            var r = Math.floor(Math.random() * 255);
                            var g = Math.floor(Math.random() * 255);
                            var b = Math.floor(Math.random() * 255);
                            var a = 0.4
                            return "rgb(" + r + "," + g + "," + b + "," + a + ")";
                        };
                        var makeColor = dynamicColors();

                        this.chartData.datasets.push({
                            label: this.exercise.name,
                            data: selectedData,
                            backgroundColor: makeColor,
                            borderColor: makeColor,
                            borderWidth: 1
                        })
                        this.graphList.push(this.exercise.id)
                    } else {
                        var dynamicColors = function () {
                            var r = Math.floor(Math.random() * 255);
                            var g = Math.floor(Math.random() * 255);
                            var b = Math.floor(Math.random() * 255);
                            var a = 0.2
                            return "rgb(" + r + "," + g + "," + b + "," + a + ")";
                        };
                        var makeColor = dynamicColors();
                        this.chartData.datasets.push({
                            label: this.exercise.name,
                            data: selectedData,
                            backgroundColor: makeColor,
                            borderColor: makeColor,
                            borderWidth: 1,
                        })
                        this.graphList.push(this.exercise.id)
                    }
                } else {
                    this.$bvToast.toast('This exercise is already on the chart', {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 5000,
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

.mt-3, .my-3 {
    margin-top: 0rem !important;
}
</style>
