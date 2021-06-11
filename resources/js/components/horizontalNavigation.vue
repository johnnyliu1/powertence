<template>
    <div>
        <b-navbar toggleable="lg" class="testShadow">
            <div class="container">
                <b-button variant="danger" v-if="authenticated === true" v-b-toggle.sidebar-1>
                    <b-icon-list></b-icon-list>
                </b-button>
                <b-navbar-brand v-else class="text-black-50" href="#">Powertence</b-navbar-brand>
                <b-sidebar
                    v-if="authenticated === true"
                    id="sidebar-1"
                    bg-variant="danger"
                    shadow
                >
                    <div class="px-3 py-2">
                        <div class="d-flex flex-column justify-content-center">
                            <div class="d-flex justify-content-center">
                                <b-avatar v-if="this.profile.length !== 0"
                                          class="profile-pic-border"
                                          :src="getProfilePicture()"
                                          href="#bar"
                                          size="10em">
                                </b-avatar>
                                <b-avatar v-else href="#bar" size="10em"></b-avatar>

                            </div>
                            <div>
                                <h2 class="text-center text-white">{{ user.name }}</h2>
                            </div>
                        </div>
                        <div class="menu-items list-unstyled mt-lg-5 mt-md-5 mt-sm-3">
                            <b-nav-item>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     class="bi bi-bar-chart-fill d-inline pr-1 text-white" viewBox="0 0 16 16">
                                    <path
                                        d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                                </svg>
                                <router-link class="menuItem m-1" to="/">Dashboard</router-link>
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
                        </div>
                        <div class="d-flex justify-content-center fixed-bottom">
                            <img width="50%" height="50%" class="logo-sm" src="/images/logo-sidebar.svg"/>
                        </div>
                    </div>
                </b-sidebar>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown v-if="authenticated === true" class="pr-5" right>
                        <template #button-content v-if="authenticated === true">
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
        ...mapGetters('user', [
            'authenticated',
            'user',
            'profile'
        ]),
    },
    methods: {
        ...mapActions('user', [
            'signOut',
            'loadProfile',
            'saveProfile'
        ]),
        async logout() {
            await this.signOut();
            this.$router.push("signin");
        },
        getProfilePicture() {
            if (this.profile[0].file !== null) {
                return '~/workspace/storage/' + this.profile[0].file
            }
        }
    },
    data() {
        return {
            user_id: null
        };
    },
    created() {
        if (this.authenticated) {
            this.user_id = this.$store.state.user.user.id;
            this.$store.dispatch('user/loadProfile', this.user_id)
        }
    }
}
</script>

<style scoped>
.bg-info {
    background-color: white !important;
    border-bottom: 1px solid #cec4d4;
    color: black;
}

.menuItem:hover {
    text-underline: none;
    color: white;
}

.authenticateItem {
    color: black;
}

.profile-pic-border {
    border: 5px solid white;
}

.testShadow {
    background-color: whitesmoke;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

@media (max-width: 767px) {
    .logo-sm {
        width: 25% !important;
        height: 25% !important;
    }
}
</style>
