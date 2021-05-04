<template>
    <div class="container">
        <h1>Register</h1>
        <form action="#" @submit.prevent="validateForm">
            <div class="form-group" :class="{ 'form-group--error': $v.userData.name.$error }">
                <label class="form__label">Name</label>
                <b-form-input
                    class="form__input"
                    v-model.trim="$v.userData.name.$model"
                    placeholder="Enter name"
                    aria-describedby="Required field"
                    :state="validateState('name')"
                />
                <div class="error" v-if="!$v.userData.name.required"><small class="text-danger">Name is required</small>
                </div>
            </div>


            <div class="form-group">
                <label>Email address</label>
                <b-form-input
                    type="email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model.trim="$v.userData.email.$model"
                    placeholder="Enter email"
                    :state="validateState('email')"
                />
                <div class="error" v-if="!$v.userData.email.email"><small class="text-danger">Must be an email</small>
                </div>
                <div class="error" v-if="!validationEmail"><small class="text-danger">Email is required</small></div>
            </div>


            <div class="form-group">
                <label>Password</label>
                <b-form-input
                    type="password"
                    class=""
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="userData.password"
                    :state="validateState('password')"
                />
                <div class="error" v-if="!$v.userData.password.required"><small class="text-danger">Password is
                    required</small></div>
                <div class="error" v-if="!$v.userData.password.minLength"><small class="text-danger">Password must have
                    at least {{ $v.userData.password.$params.minLength.min }} letters.</small></div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import {required, minLength, between, email} from 'vuelidate/lib/validators';

export default {
    name: "Register",
    data() {
        return {
            userData: {
                name: "",
                email: "",
                password: "",
            },
        };
    },
    computed: {
        validation() {
            return this.userData.name.length > 0
        },
        validationEmail() {
            return this.userData.email.length > 0
        },
        validationPassword() {
            return this.userData.password.length >= 8
        }
    },
    validations: {
        userData: {
            name: {
                required,
            },
            email: {
                email,
                required
            },
            password: {
                required,
                minLength: minLength(8)
            }
        }

    },
    methods: {
        ...mapActions('user', [
            'registerUser',
            'signIn'
        ]),

        RegisterErrorToast() {

            this.$bvToast.toast('Your email is already in use', {
                title: 'Register error',
                autoHideDelay: 5000,
                variant: 'danger'
            })
        },
        validateForm() {
            if (this.validation && this.validationEmail && this.validationPassword) {
                this.register(this.userData)
            } else {
                this.$bvToast.toast('Please fill in all fields correctly', {
                    title: 'Register error',
                    autoHideDelay: 5000,
                    variant: 'danger'
                })
            }
        },

        validateState(name) {
            const {$dirty, $error} = this.$v.userData[name]
            return $dirty ? !$error : null
        },

        async register(userData) {
            let validated = true
            try {
                await axios.post('/api/register', userData)
                    .then(function () {
                        console.log('user has been saved thenTHENN')
                    })
            } catch (e) {
                validated = false
                console.log(e + 'catch')
                this.$bvToast.toast('This email is already in use', {
                    title: 'Register error',
                    autoHideDelay: 5000,
                    variant: 'danger'
                })
            }
            if (validated === true) {
                await this.signIn(userData)
                await this.$router.push('/')
            }
        }
    },

    mounted() {
        console.log('register moutned')
    }

}
</script>

<style scoped>

</style>
