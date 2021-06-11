<template>
    <div>
        <template v-if="sets.length">
            <table class="table table-sm">
                <thead>
                <tr>
                    <th scope="col">Set</th>
                    <th scope="col">Kg</th>
                    <th scope="col">Reps</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(set,index) in sets">
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>{{ set.kg }}</td>
                        <td>{{ set.reps }}</td>
                        <td>
                            <b-button
                                class="btn btn-primary"
                                size="sm"
                                @click="askDeleteConfirmation(set)"
                            >
                                <b-icon-trash-fill>
                                </b-icon-trash-fill>
                            </b-button>
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </template>
        <template v-else>
            <h4>This exercise currently has no sets</h4>
        </template>
        <b-button class="mt-3" block @click="$bvModal.hide('setModal')">Close Me</b-button>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "SetDetail",
    props: ['exercise'],
    data() {
        return {
            user_id: this.$store.state.user.user.id,
        };
    },
    computed: {
        ...mapGetters('sets', [
            'sets'
        ]),
    },
    created() {
        this.$store.dispatch('sets/getAllSetsForExercise', this.exercise.id)
    },
    methods: {
        ...mapActions('sets', [
            'deleteSet',
            'getAllSetsForExercise'
        ]),
        ...mapMutations('sets', [
            'setSets'
        ]),
        askDeleteConfirmation(set) {
            try {
                this.$bvModal.msgBoxConfirm('Are you sure you want to delete this set?', {
                    title: 'Confirmation'
                })
                    .then((value) => {
                        if (value) {
                            this.deleteSet(set.id)
                                .then((r) => {
                                    this.$bvToast.toast('The workout has been deleted', {
                                        title: 'Workout',
                                        variant: 'success',
                                        solid: true
                                    })
                                })
                            this.getAllSetsForExercise(set.exercise_id)
                        }
                    })
            } catch (e) {
                this.$bvToast.toast('Something went wrong', {
                    variant: 'danger',
                    solid: true
                })
            }
        },
    }
}
</script>

<style scoped>

.table th, .table td {
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
}
</style>
