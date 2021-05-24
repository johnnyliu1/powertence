<template>
    <div class="container">
        <h1>Profile</h1>
        {{ authenticated }}
        {{ user }}

        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="12" md="12" class="bg mt-2 profilePicture">
                    <b-avatar v-if="this.profile.length !== 0 " href="#bar" size="10em"
                              :src="getProfilePicture()"></b-avatar>
                    <b-avatar v-else href="#bar" size="10em"></b-avatar>
                    <div class="d-inline-block profileText">
                        <h2>{{ user.name }}</h2>
                        <h5>Account created {{ user.created_at }}</h5>
                    </div>
                </b-col>
            </b-row>
            <b-row v-if="this.profile.length !== 0">
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
                <b-col v-if="profile !== null" cols="12" md="6">
                    <b-input-group prepend="Date of birth" class="mt-3">
                        <b-form-input :value="this.profile[0].birthDate" disabled>
                        </b-form-input>
                    </b-input-group>
                    <b-input-group prepend="Start weight" class="mt-3">
                        <b-form-input :value="this.profile[0].startWeight" disabled>
                        </b-form-input>
                    </b-input-group>
                    <b-input-group prepend="Goals" class="mt-3">
                        <b-form-textarea :value="this.profile[0].goals" disabled>
                        </b-form-textarea>
                    </b-input-group>
                </b-col>
            </b-row>

            <b-row>

                <b-col>
                    <b-button v-if="this.profile.length === 0" class="mt-4" variant="info"
                              @click="saveProfile(user_id)">
                        Create profile
                    </b-button>
                    <b-button v-else class="mt-4" v-b-modal.profileForm variant="info">Edit profile</b-button>
                    <b-modal id="profileForm" title="Edit profile" hide-footer>
                        <profile-form v-if="this.profile.length === 0"></profile-form>
                        <profile-form v-else :prop="this.profile[0]"></profile-form>
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
        return {
            user_id: this.$store.state.user.user.id,
            //propProfile: this.profile[0]
        };
    },
    computed: {
        ...mapGetters('user', [
            'authenticated',
            'user',
            'profile'
        ]),
    },
    methods: {
        ...mapActions('user', [
            'loadProfile',
            'saveProfile'
        ]),
        getProfilePicture() {
            if (this.profile[0].file !== null) {
                console.log('../storage/profiles/' + this.profile[0].file)
                return '../storage/profiles/' + this.profile[0].file
            }
        }
    },
    created() {
        if (this.authenticated === true) {
            this.$store.dispatch('user/loadProfile', this.user_id)
            console.log(this.profile[0])
        }
    },
};
</script>

<style scoped>


/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767px) {
    .profilePicture {
        text-align: center;
    }

    .profileText {
        margin-right: 2em;
    }
}

.profileText {
    margin-left: 2em;
}
</style>
