<template>
    <div>
        <b-form @submit="validateForm" v-if="show">
            <b-form-group id="input-group-2" label="Name of the workout" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="$v.title.$model"
                    placeholder="Enter name"
                    :state="validateState('title')"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Create</b-button>
        </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {required} from "vuelidate/lib/validators";

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
                title: null,
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
        validateState(name) {
            const {$dirty, $error} = this.$v[name]
            return $dirty ? !$error : null
        },
        validateForm(event) {
            event.preventDefault()
            if (this.$v.$invalid) {
                this.$bvToast.toast('Please make sure all fields are filled in', {
                    title: 'Form error',
                    variant: 'danger',
                    autoHideDelay: 5000
                })
            } else {
                this.onSubmit(event)
            }
        },
        onSubmit: function (event) {
            event.preventDefault()
            axios.post('api/workouts/store', {
                name: this.title,
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
    validations: {
        title: {
            required,
        }
    }
}
</script>

<style scoped>

</style>
