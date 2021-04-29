<template>
  <div class="container">
    <h1>Login</h1>
    <form action="#" @submit.prevent="handleLogin">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="userData.email" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="userData.password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    data() {
            return {
                userData : {
                    'email': '',
                    'password': ''
                }
            }
        },
        methods: {
            handleLogin() {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post('/login', this.userData).then(response => {
                    this.$router.push({ path: '/profile'})
                    this.$store.dispatch('user/loadUser');
                });
            });
            }
        },
        mounted() {
            console.log('Login mounted')
        },
        computed: {
            
        },
        created () {
        }
}
</script>

<style>

</style>