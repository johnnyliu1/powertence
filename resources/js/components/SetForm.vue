<template>
    <div class="ms-2 me-auto">
        <div class="fw-bold"><h4>{{ exercise.name }}</h4></div>

        <div class="row">
            <div class="col-sm-3">
                <label>Set</label>
            </div>
            <div class="col-sm-3">
                <label>Kg</label>
            </div>
            <div class="col-sm-3">
                <label>Reps</label>
            </div>
            <div class="col-sm-3">
                <label>Submit</label>
            </div>
        </div>

        <b-form @submit.prevent="validateForm">
            <div class="row">
                <div class="col-sm-3">
                    <b-form-input
                        size="sm"
                        type="number"
                        v-model="setForm.set"
                    >

                    </b-form-input>
                </div>
                <div class="col-sm-3">
                    <b-form-input
                        size="sm"
                        type="number"
                        v-model="setForm.kg">

                    </b-form-input>
                </div>
                <div class="col-sm-3">
                    <b-form-input
                        size="sm"
                        type="number"
                        v-model="setForm.reps">

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
        </b-form>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

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
            this.OnSubmitSet(event)
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
    },
    computed: {
        ...mapGetters('sets', [
            'sets'
        ]),
    }
}
</script>

<style scoped>

</style>
