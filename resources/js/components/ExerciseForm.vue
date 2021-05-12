<template>
    <b-form @submit.prevent="validateForm" class="">
        <label>Add a exercise</label>
        <b-form-input
            id="exerciseName"
            v-model="exerciseForm.name"
            placeholder="Exercise..."
            required
        ></b-form-input>
        <b-button type="submit" class="mt-2" variant="info">Add exercise</b-button>
    </b-form>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

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
            this.onSubmitExercise(event)
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

}
</script>

<style scoped>

</style>
