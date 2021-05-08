<template>
    <div class="container">
        <h1>Workouts</h1>
        {{ authenticated }}
        {{ user }}
        <div>
            <b-button class="mt-3 mb-3" v-b-modal.workoutForm>Create new workout</b-button>

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
                    </b-card>
                </b-card-group>
            </div>
        </div>
        <pagination class="mt-3" :data="laravelData" @pagination-change-page="getResults"></pagination>

    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
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
            form: {
                name: '',
                user: this.id,
                workoutId: null
            }
        };
    },
    methods: {
        ...mapActions('workouts', [
            'getResults',
            'deleteWorkout'
        ]),
        ...mapMutations('workouts', [
            //'setWorkouts',
            'setLaravelData'
        ]),
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
    },
    mounted() {
        console.log('Component mounted.');
        this.getResults();
    },
    computed: {
        ...mapGetters('workouts', [
            //'workouts',
            'laravelData'
        ]),
        ...mapGetters('user', [
            'authenticated',
            'user'
        ]),
    },
    created() {
        this.$store.dispatch("workouts/getResults");
        console.log(this.laravelData)
    },
};
</script>
