<template>
    <div class="ms-2 me-auto">
        <div class="fw-bold"><h4>{{ exercise.name }}</h4></div>
        <b-form @submit.prevent="validateForm">
               <div class="row">
                    <div class="col-sm-12 col-md-3">
                        <label>Set</label>
                        <b-form-input
                            size="sm"
                            type="number"
                            v-model="$v.setForm.set.$model"
                            min="0"
                            oninput="validity.valid||(value='');"
                            :state="validateState('set')"
                        >

                        </b-form-input>
                    </div>
                    <div class="col-sm-12 col-md-3" >
                        <label>Kg</label>
                        <b-form-input
                            size="sm"
                            type="number"
                            v-model="$v.setForm.kg.$model"
                            min="0"
                            oninput="validity.valid||(value='');"
                            :state="validateState('kg')"
                        >
                        </b-form-input>
                    </div>
                    <div class="col-sm-12 col-md-3">
                        <label>Reps</label>
                        <b-form-input
                            size="sm"
                            type="number"
                            v-model="$v.setForm.reps.$model"
                            min="0"
                            oninput="validity.valid||(value='');"
                            :state="validateState('reps')"
                        >
                        </b-form-input>
                    </div>
                    <div class="col-sm-12 col-md-3">
                        <label class="invisible dissapear">Submit</label>
                            <b-button class="d-block btn-on-small" size="sm" variant="info" type="submit">
                                Submit
                            </b-button>
                    </div>
                </div>
        </b-form>

<!--                <b-form @submit.prevent="validateForm">
                    <div class="row">
                        <div class="col-sm-6">
                            <b-form-input
                                size="sm"
                                type="number"
                                v-model="$v.setForm.set.$model"
                                min="0"
                                oninput="validity.valid||(value='');"
                                :state="validateState('set')"
                            >

                            </b-form-input>
                        </div>
                        <div class="col-sm-6">
                            <b-form-input
                                size="sm"
                                type="number"
                                v-model="$v.setForm.kg.$model"
                                min="0"
                                oninput="validity.valid||(value='');"
                                :state="validateState('kg')"
                            >

                            </b-form-input>
                        </div>
                        <div class="col-sm-3">
                            <b-form-input
                                size="sm"
                                type="number"
                                v-model="$v.setForm.reps.$model"
                                min="0"
                                oninput="validity.valid||(value='');"
                                :state="validateState('reps')"
                            >
                            </b-form-input>
                        </div>
                        <div class="col-sm-3">
                            <div class="d-inline">
                                <b-button size="sm" variant="info" type="submit">
                                    Submit
                                </b-button>

                            </div>
                        </div>
                    </div>
                </b-form>-->
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
    name: "SetForm",
    props: ['exercise'],
    data() {
        return {
            setForm: {
                set: null,
                kg: null,
                reps: null,
                exerciseId: this.exercise.id
            }
        }
    },
    methods: {
        validateForm(event) {
            event.preventDefault()
            if (this.$v.$invalid) {
                console.log('something is invalid')
                this.$bvToast.toast('Please make sure all fields are filled in', {
                    title: 'Set error',
                    variant: 'danger',
                    autoHideDelay: 5000
                })
            } else {
                this.OnSubmitSet(event)
            }
        },
        async OnSubmitSet(event) {
            event.preventDefault()
            console.log(event)
            try {
                await this.saveSet(this.setForm)
                this.setForm = {
                    set: null,
                    kg: null,
                    reps: null,
                    exerciseId: this.exercise.id
                }
            } catch (e) {
                console.log(e)
            }
        },
        ...mapActions('sets', [
            'saveSet',
            'getAllSetsForExercise'
        ]),
        ...mapMutations('sets', [
            'setSets'
        ]),
        validateState(name) {
            const {$dirty, $error} = this.$v.setForm[name]
            return $dirty ? !$error : null
        },
    },
    computed: {
        ...mapGetters('sets', [
            'sets'
        ]),
    },
    validations: {
        setForm: {
            set: {
                required
            },
            kg: {
                required
            },
            reps: {
                required
            }
        }
    },
}
</script>

<style scoped>
/* small devices (tablets, less than 768px) */
@media (max-width: 767px) {
.dissapear {
    display:none;
}
    .btn-on-small {
        margin-top : 2em;
    }
}
</style>
