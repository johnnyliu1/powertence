<template>
    <div class="container">
        <div>
            <div class="mt-2" deck>
                <b-card header-tag="header">
                    <template #header>
                        <h6 class="mb-0 mt-1 float-left">{{ single.name }}</h6>
                    </template>
                    <b-card-body class="p-1">
                        <!--  <h4>Started: {{ workout.startTime | moment }}</h4> -->
                        <p v-if="single.stopTime !== null">
                            <b-icon class="mr-2" icon="clock"></b-icon>
                            {{ single.betweenTime | timeBetween }}
                        </p>
                        <template v-if="single.stopTime === null">
                            <exercise-form :workoutId="single.id"></exercise-form>
                        </template>
                        <template>

                            <b-button
                                @click="toggleShowDetail(single.id)"
                                v-if="!showDetailState.includes(single.id)"
                                size="sm"
                                class="mt-2"
                                variant="dark"

                            >
                                Show exercises
                            </b-button>
                            <b-button
                                @click="toggleHideDetail(single.id)"
                                v-else
                                size="sm"
                                class="mt-2"
                                variant="dark"

                            >
                                Hide exercises
                            </b-button>
                        </template>
                        <template v-if="showDetailState.includes(single.id)">
                            <template v-if="exercises.length">
                                <ul class="list-group list-unstyled list-group-numbered mt-4">
                                    <div v-for="exercise in exercises">
                                        <li class="list-group-item">
                                            <set-form
                                                v-if="single.stopTime === null"
                                                :exercise="exercise">
                                            </set-form>
                                            <template>
                                                <b-container>
                                                    <b-row>
                                                        <b-col >
                                                            <h4>{{ exercise.name }}</h4>
                                                        </b-col>
                                                        <b-col cols="6">
                                                            <b-button
                                                                size="sm"
                                                                class="mt-2"
                                                                v-b-modal.setModal
                                                                @click="toggleShowSetsDetail(exercise.id)"
                                                            >
                                                                Show sets
                                                            </b-button>
                                                        </b-col>
                                                    </b-row>
                                                </b-container>

                                            </template>

                                        <li/>
                                    </div>
                                </ul>
                                <b-modal id="setModal" hide-footer>
                                    <set-detail></set-detail>
                                </b-modal>
                            </template>
                            <template v-else>
                                <h5 class="mt-2">No exercises exist for this workout</h5>
                            </template>
                        </template>
                    </b-card-body>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import moment from "moment";

export default {
    name: "WorkoutDetail",
    props: ['workoutId'],
    data() {
        return {
            workout_id: this.workoutId,
            user_id: this.$store.state.user.user.id,
            exerciseForm: {
                name: '',
                workoutId: null
            },
            now: 0,
            timedTracker: 0,
            showDetailState: [],
            showDetail: false,
            showSetsDetail: false,
            showSetsDetailState: []
        };
    },
    filters: {
        moment(date) {
            return moment(date).format('Do MMM YYYY')
        },
        timeBetween(date) {
            return moment(date).format('h:mm:ss')
        }
    },
    computed: {
        ...mapGetters('workouts', [
            'laravelData',
            'active',
            'workouts',
            'single',
        ]),
        ...mapState('workouts', [
            'active',
        ]),
        ...mapGetters('user', [
            'authenticated',
            'user',
            'profile'
        ]),
        ...mapGetters('exercises', [
            'exercises'
        ]),
        ...mapGetters('sets', [
            'sets'
        ]),
    },

    methods: {
        ...mapActions('workouts', [
            'getResults',
            'deleteWorkout',
            'activate',
            'getSingle'
        ]),
        ...mapMutations('workouts', [
            //'setWorkouts',
            'setLaravelData'
        ]),
        ...mapActions('exercises', [
            'saveExercise',
            'getAllExercisesForWorkout'
        ]),
        ...mapMutations('exercises', [
            'setExercises'
        ]),
        ...mapActions('sets', [
            'getAllSetsForExercise'
        ]),
        ...mapMutations('sets', [
            'setSets'
        ]),
        toggleShowDetail(workoutId) {
            this.showDetailState = []
            if (this.showDetailState.includes(workoutId)) {
                let index = this.showDetailState.indexOf(workoutId)
                this.showDetailState.splice(index, 1)
                if (index !== -1) {
                    this.showDetailState.splice(index, 1)
                }
                this.$store.dispatch('exercises/getAllExercisesForWorkout', workoutId)
            } else {
                this.showDetailState.push(workoutId)
                this.$store.dispatch('exercises/getAllExercisesForWorkout', workoutId)
            }
        },
        toggleShowSetsDetail(exerciseId) {

            if (this.showSetsDetailState.includes(exerciseId)) {
                this.showSetsDetailState = this.showSetsDetailState.filter(x => x !== exerciseId)
                this.$store.dispatch('sets/getAllSetsForExercise', exerciseId)
                console.log(this.showSetsDetailState)
            } else {
                this.showSetsDetailState.push(exerciseId)
                this.$store.dispatch('sets/getAllSetsForExercise', exerciseId)
                console.log(this.showSetsDetailState)
            }
        },
        toggleHideDetail(workoutId) {
            if (this.showDetailState.includes(workoutId)) {
                let index = this.showDetailState.indexOf(workoutId)
                this.showDetailState.splice(index, 1)
                if (index !== -1) {
                    this.showDetailState.splice(index, 1)
                }
                this.$store.dispatch('exercises/getAllExercisesForWorkout', workoutId)
            } else {
                this.$bvToast.toast('There is an error', {
                    title: 'Error',
                    autoHideDelay: 5000,
                    appendToast: append
                })
            }
        },
        toggleHideSetsDetail(exerciseId) {
            if (this.showSetsDetailState.includes(exerciseId)) {
                let index = this.showSetsDetailState.indexOf(exerciseId)
                this.showSetsDetailState.splice(index, 1)
                if (index !== -1) {
                    this.showSetsDetailState.splice(index, 1)
                }
                this.$store.dispatch('sets/getAllSetsForExercise', exerciseId)
            } else {
                this.$bvToast.toast('There is an error', {
                    title: 'Error',
                    autoHideDelay: 5000,
                    appendToast: append
                })
            }
        },
    },
    created() {
        console.log(this.workoutId)
        this.$store.dispatch('workouts/getSingle', this.workout_id)
        this.$store.dispatch('exercises/getAllExercisesForWorkout', this.workout_id)
        console.log(this.single)

    }
}
</script>

<style scoped>

</style>
