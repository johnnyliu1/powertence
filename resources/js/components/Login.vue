<template>
    <div class="container">
        <h1>Login</h1>
        <form action="#" @submit.prevent="validateData">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="$v.userData.email.$model"
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
                    v-model="$v.userData.password.$model"
                />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <b-alert v-if="wrong === true" class="mt-2" show variant="danger">Wrong login credentials</b-alert>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {required, email, minLength} from "vuelidate/lib/validators";

export default {
    data() {
        return {
            userData: {
                email: '',
                password: '',
            },
            show: false
        };
    },
    methods: {
        ...mapActions("user", ["signIn"]),
        async handleLogin() {
            await this.signIn(this.userData);
            if (this.wrong === false) {
                await this.$router.push('/')
            }
        },
        validateData(event) {
            event.preventDefault()
            if (this.$v.$invalid) {
                this.$store.dispatch('user/loadWrong', true)
            } else {
                this.handleLogin()
            }
        },
        validateState(name) {
            const {$dirty, $error} = this.$v.userData[name]
            return $dirty ? !$error : null
        },
    },
    mounted() {
        console.log("Login mounted");
    },
    computed: {
        ...mapGetters('user', [
            'wrong',
            'authenticated',
            'user'
        ])
    },
    created() {
        this.$store.dispatch('user/loadWrong', false)
        if (this.authenticated === true) {
            this.$router.push('/')
        }
    },
    validations: {
        userData: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(8)
            }
        }
    },
};
</script>

<style>
</style>
