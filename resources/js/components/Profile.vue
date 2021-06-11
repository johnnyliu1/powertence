<template>
    <div class="container">
        <h1 class="mt-4 mb-2 centered">Profile</h1>
        <div>
            <b-jumbotron class="p-4">
                <b-row>
                <b-col lg="3" md="4" sm="12" class="bg profilePicture">

                    <b-avatar v-if="this.profile.length !== 0" size="10em"
                              :src="getProfilePicture()" class="mt-0"></b-avatar>
                    <b-avatar v-else class="mt-0" size="10em"></b-avatar>
                </b-col>
                <b-col lg="9" md="8" sm="12" class="d-flex justify-content-center justify-content-md-start">
                    <div class="d-inline-block profilePicture profileText">
                        <h2 class="">{{ user.name }}</h2>
                        <h5>Account created {{ user.created_at | moment }}</h5>
                        <b-button v-if="this.profile.length === 0"
                                  variant="info"
                                  size="sm"
                                  @click="saveProfile(user_id)">
                            Create profile
                        </b-button>
                        <b-button size="sm" v-else v-b-modal.profileForm variant="info">Edit
                            profile
                        </b-button>
                    </div>
                </b-col>
                </b-row>
            </b-jumbotron>
        </div>

        <b-container class="bv-example-row">
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
                    <b-input-group prepend="Current weight" class="mt-3">
                        <b-form-input :value="this.profile[0].currentWeight" disabled>
                        </b-form-input>
                    </b-input-group>
                    <b-input-group prepend="Desired weight" class="mt-3">
                        <b-form-input :value="this.profile[0].desiredWeight" disabled>
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
import moment from "moment";

export default {
    beforeMount() {
        if (this.authenticated === false) {
            this.$router.push("/signin");
        }
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
    filters: {
        moment(date) {
            return moment(date).format("LLLL")
        },
    },
    methods: {
        ...mapActions('user', [
            'loadProfile',
            'saveProfile'
        ]),
        getProfilePicture() {
/*            if (this.profile.length !== 0 && this.profile[0].file !== null) {
                return '/workspace/storage/app/public/' + this.profile[0].file
            }*/
            if (this.profile.length !== 0 && this.profile[0].file !== null) {
                return '/storage/' + this.profile[0].file
            }
        }
    },
    created() {
        if (this.authenticated === true) {
            this.$store.dispatch('user/loadProfile', this.user_id)
        }
    },
};
</script>

<style scoped>


/* Small devices (landscape phones, less than 768px) */
@media (max-width: 768px) {
    .profilePicture {
        text-align: center;
    }

}


/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {
    .profileText {
        margin-right: 2em;
    }
    .profilePicture {
        text-align: left;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .profilePicture {
        text-align: left;
    }
}
</style>
