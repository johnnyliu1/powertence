<template>
    <div class="container">
        <h1>Profile</h1>
        {{ authenticated }}
        {{ user }}

        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="12" md="12" class="bg mt-2 profilePicture">
                    <b-avatar size="10em"></b-avatar>
                    <div class="d-inline-block">
                        <h2>{{user.name}}</h2>
                        <h5>Account created {{user.created_at}}</h5>
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
                <b-col cols="12" md="6">
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
                    <b-button class="mt-4" v-b-modal.profileForm variant="info">Edit profile</b-button>
                    <b-modal id="profileForm" title="Edit profile" hide-footer>
                        <profile-form></profile-form>
                    </b-modal>
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

/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767px) {
    .profilePicture {
        text-align: center;
    }
}
</style>
