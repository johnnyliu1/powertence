<template>
    <div class="container">
        <h1>Workouts</h1>
        <div>
            {{ authenticated }}
            {{ user.name }}
            {{ active }}
        </div>
        <div>
            <b-button v-if="this.active === false" class="mt-3 mb-3" v-b-modal.workoutForm>Create new workout</b-button>
            <b-button v-else disabled class="mt-3 mb-3" v-b-modal.workoutForm>Workout in progress</b-button>
            <b-modal id="workoutForm" title="CreateWorkout" hide-footer>
                <workout-form></workout-form>
            </b-modal>

            <b-modal id="UpdateWorkoutForm" title="CreateWorkout" hide-footer>
                <div>
                    <b-form @submit="onUpdate" v-if="show">
                        <b-form-group id="input-group-2" label="Update workout" label-for="input-2">
                            <b-form-input
                                id="input-2"
                                v-model="form.name"
                                placeholder="Enter name"
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-3" label="id" label-for="id">
                            <b-form-input
                                id="id"
                                v-model="id"
                                disabled
                                required
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-3" label="workoutId" label-for="id">
                            <b-form-input
                                id="workoutId"
                                v-model="form.workoutId"
                                disabled
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary">Update</b-button>
                    </b-form>
                    <b-card class="mt-3" header="Form Data Result">
                        <pre class="m-0">{{ form }}</pre>
                    </b-card>
                </div>
            </b-modal>

        </div>
        <div v-for="workout in laravelData.data" :key="workout.id">
            <div>
                <b-card-group class="mt-2" deck>
                    <b-card header-tag="header">
                        <template #header>
                            <h6 class="mb-0 mt-1 float-left">{{ workout.name }}</h6>
                            <div class="float-right">
                                <b-button
                                    variant="info"
                                    size="sm"
                                    @click="updateWorkout(workout)"
                                >
                                    Update
                                </b-button>
                                <b-button
                                    size="sm"
                                    variant="danger"
                                    @click="askDeleteConfirmation(workout)"
                                >
                                    Delete
                                </b-button>
                            </div>
                        </template>
                        <b-card-body class="p-1">
                            <!--  <h4>Started: {{ workout.startTime | moment }}</h4> -->
                            <b-button
                                variant="danger"
                                @click="endWorkout(workout)"
                                v-if="workout.stopTime === null"
                                size="small"
                            >

                                <b-icon icon="stop-circle"></b-icon>
                                <span class="ml-1">{{ calculateTimePassed(workout.startTime) | timer }}</span>
                            </b-button>
                            <p v-if="workout.stopTime !== null">Time {{ workout.betweenTime | timer }}</p>
                            <template v-if="workout.stopTime === null">
                                <exercise-form :workoutId="workout.id"></exercise-form>
                            </template>
                            <template>

                                <b-button
                                    @click="toggleShowDetail(workout.id)"
                                    v-if="!showDetailState.includes(workout.id)"
                                    size="sm"
                                    class="mt-2"
                                    variant="dark"

                                >
                                    Show exercises
                                </b-button>
                                <b-button
                                    @click="toggleHideDetail(workout.id)"
                                    v-else
                                    size="sm"
                                    class="mt-2"
                                    variant="dark"

                                >
                                    Hide exercises
                                </b-button>
                            </template>
                            <template v-if="showDetailState.includes(workout.id)">
                                <template v-if="exercises.length">
                                    <b-card-header class="border mt-4">Exercises</b-card-header>
                                    <ul class="list-group list-unstyled list-group-numbered">
                                        <div v-for="exercise in exercises">
                                            <li class="list-group-item">
                                                <set-form
                                                    v-if="workout.stopTime === null"
                                                    :exercise="exercise">
                                                </set-form>
                                                <template>
                                                    <h4>{{ exercise.name }}</h4>
                                                    <b-button
                                                        size="sm"
                                                        class="mt-2"
                                                        v-b-modal.setModal
                                                        @click="toggleShowSetsDetail(exercise.id)"
                                                    >
                                                        <b-icon-grip-horizontal></b-icon-grip-horizontal>
                                                        Show sets
                                                    </b-button>
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
                </b-card-group>
            </div>
        </div>
        <pagination class="mt-3" :data="laravelData" @pagination-change-page="getResults"></pagination>

    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import moment from 'moment'

export default {
    filters: {
        moment(date) {
            return moment(date).format("LLLL HH:mm:ss")
        },
        timer(date) {
            return moment(date).utcOffset(0).format("HH:mm:ss")
        }
    },
    beforeMount() {
        if (this.authenticated === false) {
            this.$router.push("/signin");
        }
    },
    data() {
        return {
            //laravelData: {},
            show: true,
            id: this.$store.state.user.user.id,
            user_id: this.$store.state.user.user.id,
            form: {
                name: '',
                user: this.id,
                workoutId: null
            },
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
    methods: {
        ...mapActions('workouts', [
            'getResults',
            'deleteWorkout',
            'activate'
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
        calculateTimePassed(startTimeString) {
            const startTime = moment(startTimeString).valueOf();
            return this.now - startTime
        },
        workoutActive(value) {
            this.$store.dispatch('workouts/activate', value)
        },
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

        deleteAndRefresh(workout) {
            this.deleteWorkout(workout);
            this.$store.dispatch("workouts/getResults");
            this.$bvToast.toast('Workout has been deleted!', {
                title: 'Delete workout',
                autoHideDelay: 5000,
                variant: 'success'
            })
        },
        askDeleteConfirmation(workout) {
            try {
                this.$bvModal.msgBoxConfirm('Are you sure you want to delete this workout?', {
                    title: 'Confirmation'
                })
                    .then((value) => {
                        if (value) {
                            this.deleteWorkout(workout.id)
                                .then((r) => {
                                    this.$bvToast.toast('The workout has been deleted', {
                                        title: 'Workout',
                                        variant: 'success',
                                        solid: true
                                    })
                                    this.getResults()
                                })
                                .catch((e) => {
                                    this.$bvToast.toast('Something went wrong', {
                                        variant: 'danger',
                                        solid: true
                                    })
                                })
                        }
                    })
            } catch (e) {
                this.$bvToast.toast('Something went wrong', {
                    variant: 'danger',
                    solid: true
                })
            }
        },
        updateWorkout(workout) {
            this.form.name = workout.name
            this.form.workoutId = workout.id
            this.$bvModal.show('UpdateWorkoutForm')
        },
        endWorkout(workout) {
            this.$store.dispatch('workouts/activate', false)
            this.form.workoutId = workout.id

            let milliseconds = this.now
            let currentTimeInMilliseconds = moment.duration(milliseconds);
            let startTime = moment(workout.startTime).valueOf();
            let timeSinceStart = currentTimeInMilliseconds.asMilliseconds() - startTime
            let stopTime = startTime + timeSinceStart
            let endValueOfStopTime = moment(stopTime).format("YYYY-MM-DD HH:mm:ss")

            /* console.log('currentTime = ' + moment(this.now).format())
             console.log(currentTimeInMilliseconds.asMilliseconds())
             console.log('startTime ' + moment(startTime).format("HH:mm:ss"))
             console.log(currentTimeInMilliseconds.asMilliseconds() - startTime)
             console.log('timeSinceStart = ' + moment(timeSinceStart, '').utcOffset(0).format("HH:mm:ss"))
             console.log('timeSinceStart ISO = ' + moment(timeSinceStart).utcOffset(0).format())
             console.log(parseInt(stopTime))
             console.log(moment(stopTime).format("YYYY-MM-DD HH:mm:ss"))*/
            let endValueOfTimeSinceStart = moment(timeSinceStart).format("YYYY-MM-DD HH:mm:ss")

            if (workout.stopTime === null) {
                this.form.workoutId = workout.id
                axios.put('api/workouts/update/timer/' + this.form.workoutId, {
                    workoutId: this.form.workoutId,
                    stopTime: endValueOfStopTime,
                    betweenTime: endValueOfTimeSinceStart
                })
                    .then((response) => {
                        console.log(response);
                        this.getResults()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        onUpdate: function (event) {
            event.preventDefault()
            axios.put('api/workouts/update/' + this.form.workoutId, {
                workoutId: this.form.workoutId,
                name: this.form.name
            })
                .then((response) => {
                    console.log(response);
                    this.$bvModal.hide('UpdateWorkoutForm')
                    this.getResults()
                })
                .catch(error => {
                    console.log(error);
                })
        },
        currentTime() {
            this.now = Date.now()
        },
    },
    mounted() {
        console.log('Component mounted.');
        this.getResults();
    },
    computed: {
        ...mapGetters('workouts', [
            //'workouts',
            'laravelData',
            'active'
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
    created() {
        this.$store.dispatch("workouts/getResults");
        console.log(this.laravelData)
        this.currentTime()

        setInterval(this.currentTime.bind(this), 1000)
        // when new user gets created the state of active was true so no workout could be created
        if (this.laravelData.data.length === 0) {
            this.$store.dispatch("workouts/activate", false)
        }
        if (this.authenticated === true) {
            this.$store.dispatch('user/loadProfile', this.user_id)
            console.log(this.profile[0])
        }
    },
};
</script>
