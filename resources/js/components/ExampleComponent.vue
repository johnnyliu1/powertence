<template>
    <div class="container">
<h1>Left navigation bar</h1>
                        <div>
                        <router-link to="/login">Login</router-link>
                        <router-link to="/register">Register</router-link>
                        </div>
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
.container {
    background-color: red;
}
</style>
