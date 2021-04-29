<template>
    <div class="container">
<h1>Workouts</h1>
        <h1>{{ test }}</h1>
        <h2>{{ isLoggedIn }}</h2>
    <div class="container" v-if="workouts.length">
        <ul>
            <li v-for="workout in workouts" v-bind:key="workout.id">
                {{workout.workout}}
            </li>
        </ul>
    </div>
    </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
    export default {
        data() {
            return {

            }
        },
        methods: {
            getWorkouts() {
                axios.get('/api/workouts').then(response => {
                    console.log(response);
                    this.workouts = response.data;
                });
            },
            ...mapActions('workouts', [
                'setTest'
            ])
        },
        mounted() {
            console.log('Component mounted.')
        },
        computed: {
            ...mapState('workouts', [
                'test',
                'workouts'
            ],
            ),
            ...mapGetters('workouts', [
                'test',
                'workouts'
            ]),
            ...mapGetters('user', [
                'isLoggedIn'
            ])

        },
        created () {
            this.$store.dispatch('workouts/getTest')
            this.$store.dispatch('workouts/getAllWorkouts')

        }
    }
</script>
