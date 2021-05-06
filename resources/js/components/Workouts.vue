<template>
    <div class="container">
        <h1>Workouts</h1>
        {{ authenticated }}
        {{ user }}
        <div>
            <b-button class="mt-3 mb-3" v-b-modal.workoutForm>Create new workout</b-button>

            <b-modal id="workoutForm" title="CreateWorkout">
                <workout-form></workout-form>
            </b-modal>
        </div>
        <div class="container" v-if="workouts.length">

                <div v-for="workout in workouts" v-bind:key="workout.id">
                    <div>
                        <b-card-group  class="mt-2" deck>
                            <b-card header-tag="header" footer-tag="footer">
                                <template #header>
                                    <h6 class="mb-0">{{workout.name}}</h6>
                                </template>
                            </b-card>
                        </b-card-group>
                    </div>
                </div>
        </div>
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
        return {};
    },
    methods: {
        ...mapActions('workouts', [
            'getAllWorkouts'
        ]),
        ...mapMutations('workouts', [
            'setWorkouts'
        ])
    },
    mounted() {
        console.log('Component mounted.');
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
    created() {
        this.$store.dispatch("workouts/getAllWorkouts");
    },
};
</script>
