<template>
    <div class="container">
        <div class="mt-4">
            <b-card>
                <h1>Login</h1>
                <form action="#" @submit.prevent="validateData">
                    <div class="form-group">
                        <label>Email address</label>
                        <b-form-input
                            type="text"
                            id="exampleInputEmail1"
                            v-model="$v.userData.email.$model"
                            placeholder="Enter email"
                            :state="validateState('email')"
                        />
                        <div class="error" v-if="!$v.userData.email">Must be valid email adress</div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <b-form-input
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
            </b-card>
        </div>
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
            try {
                await this.signIn(this.userData);
                await this.$router.push('/')
            } catch (e) {
                this.$store.dispatch('user/loadWrong', true)
            }

        },
        validateData(event) {
            event.preventDefault()
            if (this.$v.$invalid) {
                this.$store.dispatch('user/loadWrong', true)
            } else {
                this.handleLogin()
                if (this.username !== null) {
                    setTimeout(function () {
                        this.$store.dispatch('user/loadWrong', true)
                    }, 3000);
                }
            }
        },
        validateState(name) {
            const {$dirty, $error} = this.$v.userData[name]
            return $dirty ? !$error : null
        },
    },
    computed: {
        ...mapGetters('user', [
            'wrong',
            'authenticated',
            'user'
        ])
    },
    created() {
        this.$store.dispatch('user/signOut')
        this.$store.dispatch('user/loadWrong', false)
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
