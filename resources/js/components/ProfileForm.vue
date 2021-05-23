<template>
    <div>
        <b-form @submit="onUpdate">
            <b-form-group>
                <label>Choose a date</label>
                <b-form-datepicker
                    id="example-datepicker"
                    v-model="profileForm.dateOfBirth"
                    class="mb-2">
                </b-form-datepicker>
                <p>Value: '{{ profileForm.dateOfBirth }}'</p>
            </b-form-group>
            <b-form-group>
                <b-form-file
                    v-model="profileForm.file"
                    :state="Boolean(profileForm.file)"
                    :placeholder="this.prop.file"
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3">Selected file: {{ profileForm.file ? profileForm.file.name : '' }}</div>
            </b-form-group>
            <b-form-group>
                <label>Start weight</label>
                <b-form-input
                    size="sm"
                    type="number"
                    v-model="profileForm.startWeight"
                    min="0"
                    oninput="validity.valid||(value='');"
                >
                </b-form-input>
            </b-form-group>
            <b-form-group>
                <label>Goals</label>
                <b-form-textarea
                    id="textarea"
                    v-model="profileForm.goals"
                    :value="this.prop.goals"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary">Update profile</b-button>
        </b-form>


    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "ProfileForm",
    props: ['prop'],
    data() {
        return {
            user_id: this.$store.state.user.user.id,
            profileForm: {
                startWeight: null,
                dateOfBirth: null,
                file: null,
                goals: null
            },
            profileId: this.$store.getters["user/profile"]
        };
    },

    methods: {
        ...mapActions('user', [
            'loadProfile',
            'saveProfile'
        ]),
        onUpdate: function (event) {
            event.preventDefault()
            axios.put('api/profile/update/' + this.profileId[0].id, {
                profileId: this.profileId[0].id,
                startWeight: this.profileForm.startWeight,
                dateOfBirth: this.profileForm.dateOfBirth,
                file: this.profileForm.file,
                goals: this.profileForm.goals

            })
                .then((response) => {
                    console.log(response);
                    this.$bvModal.hide('profileForm')
                    this.loadProfile(this.profileId[0].id)
                })
                .catch(error => {
                    console.log(error);
                })
            console.log(this.user_id);
            console.log(this.profileId[0].id);
        },
    },
    created() {
        console.log('PASSED PROP ' + this.prop.id)
        this.profileForm.startWeight = this.prop.startWeight
        this.profileForm.dateOfBirth = this.prop.dateOfBirth
        this.profileForm.goals = this.prop.goals
    }
}
</script>

<style scoped>

</style>
