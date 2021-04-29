<template>
    <div class="container">
        <h1>Profile</h1>
        <p>{{ isLoggedIn }}</p>
        <p>Hello, {{ user }}</p>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState,  } from 'vuex';
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data () {
            return {
            }
        },
        computed: {
            ...mapState('user', [
                'isLoggedIn',
                'user'
            ]),
            ...mapGetters('user', [
                'user',
                'isLoggedIn'
            ])
        },
        methods: {
            ...mapActions('user', [
                'loadUser'
            ]),
            ...mapMutations('user', [
                'setLoggedIn',
                'setUser'
            ])
        },
        created() {
        }
    }
</script>
