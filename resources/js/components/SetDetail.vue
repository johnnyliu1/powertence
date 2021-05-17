<template>
    <div>
        <template v-if="sets.length">
            <table class="table table-sm">
                <thead>
                <tr>
                    <th scope="col">Set</th>
                    <th scope="col">Kg</th>
                    <th scope="col">Reps</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="set in sets">
                    <tr>
                        <td>{{ set.set }}</td>
                        <td>{{ set.kg }}</td>
                        <td>{{ set.reps }}</td>
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
import {mapGetters} from "vuex";

export default {
    name: "SetDetail",
    props: ['exercise'],
    data() {
        return {
            test: this.exercise
        };
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
