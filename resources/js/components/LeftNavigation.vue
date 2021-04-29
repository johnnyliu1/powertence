<template>
    <div class="container">
        <h1>Left navigation bar</h1>

        <router-link to="/">Home</router-link>
        <router-link to="/workouts">Workouts</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/loginuser">Login</router-link>
    <router-view></router-view>
    </div>
    
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style>

</style>
