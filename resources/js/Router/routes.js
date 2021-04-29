const routes = [
    { path: '/' },
    { path: '/workouts', component: require('../components/Workouts.vue').default },
    { path: '/profile', component: require('../components/Profile.vue').default },
    { path: '/loginuser', component: require('../components/Login.vue').default }
]
export default routes;