const routes = [
    { path: '/', component: require('../components/Dashboard.vue').default },
    { path: '/workouts', component: require('../components/Workouts.vue').default },
    { path: '/profile', component: require('../components/Profile.vue').default },
    { path: '/signin', component: require('../components/Login.vue').default },
    { path: '/register-user', component: require('../components/Register.vue').default }
]
export default routes;
