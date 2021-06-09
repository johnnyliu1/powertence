<template>
    <div>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group id="input-group-2" label="Name of the workout" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.name"
                    placeholder="Enter name"
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Create</b-button>
        </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
    name: "WorkoutForm",
    beforeMount() {
        if (this.authenticated === false) {
            this.$router.push("/signin");
        }
    },
    data() {
        return {
            show: true,
            id: this.$store.state.user.user.id,
            form: {
                name: '',
            }
        }
    },
    methods: {
        ...mapActions('workouts', [
            'getResults',
            'activate',
            'getAllWorkouts'
        ]),
        ...mapMutations('workouts', [
            'setLaravelData',
            'setActive',
            'setAllWorkouts'
        ]),

        onSubmit: function (event) {
            event.preventDefault()
            axios.post('api/workouts/store', {
                name: this.form.name,
                userId: this.id
            })
                .then((response) => {
                    this.$store.dispatch("workouts/getResults");
                    this.$store.dispatch('workouts/getAllWorkouts', this.id)
                    this.$store.dispatch('workouts/activate', true)
                    this.$bvModal.hide('workoutForm')
                })
            this.getAllWorkouts(this.id)
        },
    },
    computed: {
        ...mapGetters('workouts', [
            //'workouts',
            'laravelData',
            'active',
            'allWorkouts'
        ]),
        ...mapGetters('user', [
            'authenticated',
            'user'
        ]),
        ...mapState('workouts', [
            'allWorkouts'
        ])

    },
}
</script>

<style scoped>

</style>
