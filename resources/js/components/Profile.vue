<template>
    <div class="container">
        <h1>Profile</h1>
        {{ authenticated }}
        {{ user }}

        <b-container class="bv-example-row">
            <b-row>
                <b-col class="bg mt-2">
                    <b-avatar size="10em"></b-avatar>
                    <div class="d-inline-block ml-5">
                        <h2>{{user.name}}</h2>
                        <h2>Account created {{user.created_at}}</h2>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div>
                        <b-input-group prepend="Name" class="mt-3">
                            <b-form-input :value="user.name" disabled>
                            </b-form-input>
                        </b-input-group>
                        <b-input-group prepend="@" class="mt-3">
                            <b-form-input :value="user.email" disabled>
                            </b-form-input>
                        </b-input-group>
                    </div>
                </b-col>
                <b-col>
                    <b-input-group prepend="Date of birth" class="mt-3">
                        <b-form-input disabled>
                        </b-form-input>
                    </b-input-group>
                    <b-input-group prepend="Start weight" class="mt-3">
                        <b-form-input disabled>
                        </b-form-input>
                    </b-input-group>
                    <b-input-group prepend="Goals" class="mt-3">
                        <b-form-textarea disabled>
                        </b-form-textarea>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-button class="mt-4" variant="info">Edit profile</b-button>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
    beforeMount() {
        if (this.authenticated === false) {
            this.$router.push("/signin");
        }
    },
    mounted() {
        console.log("Component mounted.");
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters("user", ["authenticated", "user"]),
    },
    methods: {},
    created() {
    },
};
</script>

<style scoped>
.bg {
    background-color: red;
}
</style>
