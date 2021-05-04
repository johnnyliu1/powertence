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
        if (this.authenticated === false) {
            this.$router.push('/signin')
        }
    },
    computed: {
        ...mapGetters("user",
            ["authenticated", "user"]),
    },
    methods: {

    }
}
</script>

<style>

</style>
