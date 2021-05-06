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

            <div v-for="workout in laravelData.data" :key="workout.id">
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


            <div v-for="workout in laravelData.data" :key="workout.id">
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
        };
    },
    methods: {
        ...mapActions('workouts', [
            'getAllWorkouts',
            'getResults'
        ]),
        ...mapMutations('workouts', [
            'setWorkouts',
            'setLaravelData'
        ])
    },
    mounted() {
        console.log('Component mounted.');
        this.getResults();
    },
    computed: {
        ...mapGetters('workouts', [
            'workouts',
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
