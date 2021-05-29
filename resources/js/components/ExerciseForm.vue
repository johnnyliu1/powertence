<template>
    <b-form @submit.prevent="validateForm" class="mt-4 mb-2">
        <div class="centered">
        <label>Add a exercise</label>
        </div>
        <div class="centered">
        <b-input-group>
        <b-form-input
            id="exerciseName"
            v-model="$v.exerciseForm.name.$model"
            placeholder="Exercise..."
            :state="validateState('name')"
        ></b-form-input>
            <b-input-group-append>
                <b-button type="submit" variant="info">Add exercise</b-button>
            </b-input-group-append>
        </b-input-group>
        </div>
    </b-form>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
    name: "ExerciseForm",
    props: ['workoutId'],
    data() {
        return {
            //laravelData: {},
            show: true,
            id: this.$store.state.user.user.id,
            exerciseForm: {
                name: '',
                workoutId: this.workoutId
            }
        };
    },
    methods: {
        ...mapMutations('exercises', [
            'setExercises'
        ]),
        ...mapActions('exercises', [
            'getAllExercisesForWorkout',
            'saveExercise'
        ]),
        validateForm(event) {
            event.preventDefault()
            if (this.$v.$invalid) {
                this.$bvToast.toast('Please make sure the Exercise field is not empty', {
                    title: 'Set error',
                    variant: 'danger',
                    autoHideDelay: 5000
                })
            } else {
                this.onSubmitExercise(event)
            }
        },
        async onSubmitExercise(event) {
            event.preventDefault()
            console.log(event)
            try {
                await this.saveExercise(this.exerciseForm)
                this.exerciseForm = {
                    name: '',
                    workoutId: this.workoutId
                }
            } catch (e) {
                console.log(e)
            }
        },
        validateState(name) {
            const {$dirty, $error} = this.$v.exerciseForm[name]
            return $dirty ? !$error : null
        },
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
        ...mapGetters('exercises', [
            'exercises'
        ]),
    },
    validations: {
        exerciseForm: {
            name: {
                required
            },
        }
    },

}
</script>

<style scoped>
@media (max-width: 767px) {
    .centered {
        text-align: center;
        justify-content: center !important;
        display:flex !important;
    }
    .logo-sm {

    }
}
</style>
