<template>
    <div class="container">
        <h1 class="mt-4 mb-2 centered">Workouts</h1>
        <div class="centered">
            <b-jumbotron class="pl-4 pt-0 pb-0">
                <h4 class="pt-3"><strong>
                    <blockquote>{{ quote }}</blockquote>
                </strong></h4>
                <small class="pt-1">{{ author }}</small>
                <hr>
                <p v-if="laravelData.total !== 0" class="pt-3">You currently have {{ laravelData.total }} workout(s).</p>
                <p v-else class="pt-3">You currently have 0 workout(s).</p>

                <b-button v-if="this.active === false" class="mt-1 mb-3 primary-btn" v-b-modal.workoutForm>Create new
                    workout
                </b-button>
                <b-button v-else disabled class="mt-1 mb-3 primary-btn" v-b-modal.workoutForm>Workout in progress
                </b-button>
            </b-jumbotron>
        </div>
        <!--        <div>
                    {{ authenticated }}
                    {{ user.name }}
                    {{ active }}
                </div>-->
        <div>
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
            <template v-if="">

            </template>
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
                            <div class="centered">
                                <b-button
                                    variant="danger"
                                    @click="endWorkout(workout)"
                                    v-if="workout.stopTime === null"
                                    size="small"
                                >

                                    <b-icon icon="stop-circle"></b-icon>
                                    <span class="ml-1">{{ calculateTimePassed(workout.startTime) | timer }}</span>
                                </b-button>
                            </div>
                            <p class="centered" v-if="workout.stopTime !== null">
                                <b-icon class="mr-2 mt-1" icon="clock"></b-icon>
                                {{ workout.betweenTime | timer }}
                            </p>
                            <p class="centered" v-if="workout.stopTime !== null">
                                <b-icon class="mr-2 mt-1" icon="calendar"></b-icon>
                                {{ workout.created_at | detail }}
                            </p>
                            <p class="centered" v-if="workout.stopTime !== null">
                                <b-icon class="mr-2 mt-1" icon="person-circle"></b-icon>
                                {{ user.name }}
                            </p>
                            <template v-if="workout.stopTime === null">
                                <exercise-form :workoutId="workout.id"></exercise-form>
                            </template>
                            <template>
                                <div class="centered">
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
                                </div>
                            </template>
                            <template v-if="showDetailState.includes(workout.id)">
                                <template v-if="exercises.length">
                                    <b-card-header class="border mt-4">Exercises</b-card-header>
                                    <ul class="list-group list-unstyled list-group-numbered">
                                        <div v-for="exercise in exercises">
                                            <li class="list-group-item">
                                                <h4 v-if="workout.stopTime !== null">{{ exercise.name }}</h4>
                                                <set-form
                                                    v-if="workout.stopTime === null"
                                                    :exercise="exercise">
                                                </set-form>
                                                <template>

                                                    <div class="centered">
                                                        <b-button
                                                            size="sm"
                                                            class="mt-2 "
                                                            v-b-modal.setModal
                                                            @click="toggleShowSetsDetail(exercise.id)"
                                                        >
                                                            Show sets
                                                        </b-button>
                                                    </div>
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
        },
        detail(date) {
            return moment(date).format('DD/MM/YYYY')
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
            quote: null,
            author: null,
            isActive: null,
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
            'activate',
            'getAllWorkouts'
        ]),
        ...mapMutations('workouts', [
            //'setWorkouts',
            'setLaravelData',
            'setAllWorkouts'
        ]),
        ...mapActions('exercises', [
            'saveExercise',
            'getAllExercisesForWorkout'
        ]),
        ...mapMutations('exercises', [
            'setExercises'
        ]),
        calculateTimePassed(startTimeString) {
            const startTime = moment(startTimeString).valueOf()
            return this.now - startTime
            this.$forceUpdate();

        },
        getRandomQuote() {
            let self = this
            fetch("https://type.fit/api/quotes")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    const NumberOfQuotes = data.length
                    const randomNumber = Math.floor(Math.random(0, NumberOfQuotes) * 100)
                    const quote = data[randomNumber]
                    self.quote = quote.text
                    self.author = quote.author
                });
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
            } else {
                this.showSetsDetailState.push(exerciseId)
                this.$store.dispatch('sets/getAllSetsForExercise', exerciseId)
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
                })
            }
        },

        deleteAndRefresh(workout) {
            this.deleteWorkout(workout);
            this.$store.dispatch("workouts/getResults");
            this.$store.dispatch('workouts/getAllWorkouts', this.id)
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
            let endValueOfTimeSinceStart = moment(timeSinceStart).format("YYYY-MM-DD HH:mm:ss")

            if (workout.stopTime === null) {
                this.form.workoutId = workout.id
                axios.put('api/workouts/update/timer/' + this.form.workoutId, {
                    workoutId: this.form.workoutId,
                    stopTime: endValueOfStopTime,
                    betweenTime: endValueOfTimeSinceStart
                })
                    .then((response) => {
                        this.getResults()
                    })
                    .catch(error => {
                        this.$bvToast.toast('Something went wrong', {
                            title: error,
                            variant: 'danger',
                            autoHideDelay: 5000,
                        })
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
                    this.$bvModal.hide('UpdateWorkoutForm')
                    this.getResults()
                    this.getAllWorkouts(this.id)
                    this.$forceUpdate()
                    this.$store.dispatch('workouts/getAllWorkouts', this.user_id)
                })
                .catch(error => {
                    this.$bvToast.toast('Something went wrong', {
                        title: error,
                        variant: 'danger',
                        autoHideDelay: 5000,
                    })
                })
        },
        currentTime() {
            this.now = Date.now() - 7200000
        },
    },
    mounted() {
        if (this.authenticated === true) {
            this.$store.dispatch('user/loadProfile', this.user_id)
            this.$store.dispatch('workouts/getAllWorkouts', this.user_id)
        }


    },
    computed: {
        ...mapGetters('workouts', [
            //'workouts',
            'laravelData',
            'active',
            'allWorkouts'
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
        this.getRandomQuote();
        this.getResults();
        this.getAllWorkouts(this.id)
        console.log(this.getAllWorkouts)

        setInterval(this.currentTime.bind(this), 1000)
        setInterval(this.calculateTimePassed.bind(this), 1000)
        // when new user gets created the state of active was true so no workout could be created
        if (this.laravelData.data.length === 0) {
            this.$store.dispatch("workouts/activate", false)
        }
        for (let i = 0; i < this.allWorkouts.length; i++) {
            if (this.allWorkouts[i].stopTime === null) {
                console.log('er is een NULL in ALLWORKOUTS')
                this.$store.dispatch("workouts/activate", true)
            }
        }
    },
};
</script>

<style>
.btn-secondary {
    background-color: #003c77 !important;
    border-color: #003c77 !important;
}

.btn-dark {
    background-color: #003c77 !important;
    border-color: #003c77 !important;
}

.btn-info {
    background-color: #003c77 !important;
    border-color: #003c77 !important;
}

.btn-primary {
    background-color: #003c77 !important;
    border-color: #003c77 !important;
}

.btn-primary:hover {
    background-color: #002877 !important;
    border-color: #002877 !important;
}

ul .page-item.active .page-link {
    background-color: #002877 !important;
    border-color: #002877 !important;
}
.menuItem:hover {
    text-underline: none;
    color: white;
}

@media (max-width: 767px) {
    .centered {
        text-align: center;
        justify-content: center !important;
        display: flex !important;
    }

    .logo-sm {

    }
}

/* Medium devices (tablets, less than 992px) */
@media (max-width: 991px) {
    .centered-md {
        text-align: center;
        justify-content: center !important;
        display: flex !important;
    }
}
</style>
