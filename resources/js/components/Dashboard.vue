<template>
    <div class="container">
        <div class="mt-4 mb-2">
        <h1>Dashboards</h1>
        {{ authenticated }}
        {{ user }}
            {{getAllWorkouts}}
            <b-container>
                <b-row>
                    <b-col sm="12" md="6">
                    test
                    </b-col>
                    <b-col sm="12" md="6">
test
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="12" md="6">
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                                <th scope="col">View</th>
                            </tr>
                            </thead>
                            <tbody v-for="workout in getAllWorkouts">
                            <tr>
                                <td>{{ workout.name }}</td>
                                <td>{{ workout.created_at }}</td>
                                <td>{{ workout.betweenTime }}</td>
                                <td><b-button size="sm" @click="toggleDetail(workout.id)">View</b-button></td>
                            </tr>
                            </tbody>
                        </table>
                    </b-col>
                    <b-col sm="12" md="6">
                        test
                    </b-col>
                </b-row>
            </b-container>
    </div>
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters, mapMutations,
    mapState
} from "vuex";

export default {
    mounted() {
        console.log("dashboard mounted");
    },
    beforeMount() {
    },
    data() {
        return {
            user_id: this.$store.state.user.user.id,
        }
    },
    created() {
        this.getAll()
        if (this.authenticated === false) {
        this.$router.push('/signin')
        }
        if (this.authenticated === true) {
            this.$store.dispatch('user/loadProfile', this.user_id)
            console.log(this.profile[0])
        }
    },
    computed: {
        ...mapGetters('user', [
            'authenticated',
            'user',
            'profile'
        ]),
        ...mapGetters('workouts', [
            //'workouts',
            'getAllWorkouts',
        ]),
        ...mapState('workouts', [
            'allWorkouts',
        ]),
    },
    methods: {
        ...mapActions('workouts', [
            'getAll',
            'getResults'
        ]),
        ...mapMutations('workouts', [
            //'setWorkouts',
            'setAllWorkouts',
            'setWorkouts'
        ]),
    }
}
</script>

<style>

</style>
