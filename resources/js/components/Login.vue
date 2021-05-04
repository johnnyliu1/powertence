<template>
    <div class="container">
        <h1>Login</h1>
        <form action="#" @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    class=""
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="userData.email"
                    placeholder="Enter email"
                />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    class=""
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="userData.password"
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    data() {
        return {
            userData: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions("user", ["signIn"]),
        async handleLogin() {
            await this.signIn(this.userData);
            await this.$router.push("/");
        },
    },
    mounted() {
        console.log("Login mounted");
    },
    computed: {},
    created() {
    },
};
</script>

<style>
</style>
