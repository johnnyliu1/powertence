<template>
    <div class="container">
        <h1>Dashboard</h1>
        {{ authenticated }}
        {{ user }}
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters,
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
    },
    methods: {

    }
}
</script>

<style>

</style>
