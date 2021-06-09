<template>
    <div>
        <b-form @submit="onUpdate" enctype="multipart/form-data" method="PUT">
            <b-form-group>
                <label>Profile picture</label>
                <input type="file" class="form-control btn btn-primary p-1" v-on:change="onFilesUpdate">
<!--                <b-form-file
                    v-model="profileForm.file"
                    :state="Boolean(profileForm.file)"
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                <div class="mt-3">Selected file: {{ profileForm.file ? profileForm.file.name : '' }}</div>-->
            </b-form-group>
            <b-form-group>
                <label>Choose a date</label>
                <b-form-datepicker
                    id="example-datepicker"
                    v-model="profileForm.dateOfBirth"
                    class="mb-2">
                </b-form-datepicker>
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
                <label>Current Weight</label>
                <b-form-input
                    size="sm"
                    type="number"
                    v-model="profileForm.currentWeight"
                    min="0"
                    oninput="validity.valid||(value='');"
                >
                </b-form-input>
                <label>Desired weight</label>
                <b-form-input
                    size="sm"
                    type="number"
                    v-model="profileForm.desiredWeight"
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
                currentWeight: null,
                desiredWeight: null,
                dateOfBirth: null,
                file: null,
                goals: null
            },
            profileId: this.$store.getters["user/profile"],
            file: '',
        };
    },

    methods: {
        ...mapActions('user', [
            'loadProfile',
            'saveProfile'
        ]),
        onFilesUpdate(e){
            this.file = e.target.files[0];
            this.profileForm.file = e.target.files[0]
        },
        onUpdate: function (event) {
            event.preventDefault()
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            let data = new FormData();
            //data.append('file', this.file);
            data.append('profileId', this.profileId[0].id)
            data.append('startWeight', this.profileForm.startWeight)
            data.append('currentWeight', this.profileForm.currentWeight)
            data.append('desiredWeight', this.profileForm.desiredWeight)
            data.append('dateOfBirth', this.profileForm.dateOfBirth)
            data.append('file', this.profileForm.file)
            data.append('goals', this.profileForm.goals)


/*           axios.put('api/profile/update/' + this.profileId[0].id, {
                    profileId: this.profileId[0].id,
                    startWeight: this.profileForm.startWeight,
                    dateOfBirth: this.profileForm.dateOfBirth,
                    file: this.profileForm.file,
                    goals: this.profileForm.goals
                })*/
            axios.post('api/profile/update/' + this.profileId[0].id, data, config)
                .then((response) => {
                    this.$bvModal.hide('profileForm')
                    this.loadProfile(this.profileId[0].id)
                })
                .catch(error => {
                    this.$bvToast.toast('Something went wrong', {
                        title: error,
                        variant: 'danger',
                        solid: true
                    })
                })
        },
    },
    created() {
        this.profileForm.startWeight = this.prop.startWeight
        this.profileForm.currentWeight = this.prop.currentWeight
        this.profileForm.desiredWeight = this.prop.desiredWeight
        this.profileForm.dateOfBirth = this.prop.dateOfBirth
        this.profileForm.goals = this.prop.goals
    }
}
</script>

<style scoped>

</style>
