<template>
    <div>
        <horizontal-nav></horizontal-nav>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            user_id: null,
        }
    },
    created() {
        if (this.authenticated) {
            this.user_id = this.$store.state.user.user.id
            this.$store.dispatch('user/loadProfile', this.user_id)
        }
    },
    methods: {
        ...mapActions('user', [
            'signOut',
            'loadProfile',
            'saveProfile'
        ]),
    },
    computed: {
        ...mapGetters('user', [
            'authenticated',
            'user',
            'profile'
        ]),
        ...mapGetters('workouts', [
            'getAll'
        ]),
        ...mapState('user', [
            'user',
            'authenticated',
            'profile'
        ])
    },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro');

* {
    font-family: "Source Sans Pro";
}
.b-nav {
    height: 100vh;
    background: #a53239;
    float: left;
}

.navWidth {
    width: 15%;
}

.menuItem {
    color: white;
}

.navWidth b-nav-item {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
