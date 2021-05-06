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
            <b-form-group  id="input-group-3" label="id" label-for="id">
                <b-form-input
                    id="id"
                    v-model="id"
                    disabled
                    required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Create</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
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
            'getAllWorkouts'
        ]),
        ...mapMutations('workouts', [
            'setWorkouts'
        ]),
        onSubmit: function (event) {
            event.preventDefault()
            console.log(event)
            axios.post('api/workouts/store', {
                    name: this.form.name,
                    userId: this.id
            })
                .then((response) => {
                    console.log(response);
                    console.log(this.form.name)
                    this.$store.dispatch("workouts/getAllWorkouts");
                    this.$bvModal.hide('workoutForm')
                })
                .catch(error => {
                    console.log(error);
                    console.log(this.form.name)
                    console.log(this.id)
                })
        },
    },
    computed: {
        ...mapGetters('workouts', [
            'workouts'
        ]),
        ...mapGetters('user', [
            'authenticated',
            'user'
        ]),
    },
}
</script>

<style scoped>

</style>
