<template>
    <!--    <div>
                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                &lt;!&ndash; Right aligned nav items &ndash;&gt;
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="authenticated === true" class="pr-5" right>
                        &lt;!&ndash; Using 'button-content' slot &ndash;&gt;
                        <template  #button-content v-if="authenticated">
                            <em>{{ user.name }}</em>
                        </template>
                        <template>
                            <b-dropdown-item @click="logout" href="#">Sign Out</b-dropdown-item>
                        </template>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
                </div>-->

    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <div class="container">
                <b-button v-if="authenticated === true" v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
                <b-navbar-brand v-else class="text-black-50" href="#">Powertence</b-navbar-brand>
                <b-sidebar v-if="authenticated" noCloseOnRouteChange id="sidebar-1" title="Sidebar" bg-variant="danger"
                           shadow>
                    <div class="px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="250" height="250" fill="currentColor"
                             class="bi bi-image text-white" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            <path
                                d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>
                        <div class="menu-items list-unstyled">
                            <b-nav-item>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     class="bi bi-bar-chart-fill d-inline pr-1 text-white" viewBox="0 0 16 16">
                                    <path
                                        d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                                <router-link class="menuItem m-1" to="/">Home</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     class="bi bi-forward-fill pr-1 d-inline text-white" viewBox="0 0 16 16">
                                    <path
                                        d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z"/>
                                </svg>
                                <router-link class="menuItem m-1" to="/workouts">Workouts</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     class="bi bi-person-fill d-inline pr-1 text-white" viewBox="0 0 16 16">
                                    <path
                                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                <router-link class="menuItem m-1" to="/profile">Profile</router-link>
                            </b-nav-item>
                            <b-nav-item>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     class="bi bi-calendar-check-fill d-inline pr-1 text-white" viewBox="0 0 16 16">
                                    <path
                                        d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                                </svg>
                                <router-link class="menuItem m-1" to="/signin">Calendar</router-link>
                            </b-nav-item>
                        </div>
                    </div>
                </b-sidebar>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="authenticated === true" class="pr-5" right>
                        <template #button-content v-if="authenticated">
                            <em class="text-black-50">{{ user.name }}</em>
                        </template>
                        <template variant="danger">
                            <b-dropdown-item @click="logout" href="#"><span>Sign Out</span></b-dropdown-item>
                        </template>
                    </b-nav-item-dropdown>
                    <template v-else>
                        <router-link class="pl-2 authenticateItem d-inline" to="/signin">Login</router-link>
                        <router-link class="pl-2 authenticateItem d-inline" to="/register-user">Register</router-link>
                    </template>
                </b-navbar-nav>
            </div>
        </b-navbar>
    </div>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "horizontalNavigation",

    computed: {
        ...mapGetters("user",
            ["authenticated", "user"]),
    },
    methods: {
        ...mapActions("user", ["signOut"]),
        async logout() {
            await this.signOut();
            this.$router.push("signin");
        },
    },
}
</script>

<style scoped>
.bg-info {
    background-color: white !important;
    border-bottom: 1px solid #cec4d4;
    color: black;
}

.authenticateItem {
    color: black;

}
</style>
