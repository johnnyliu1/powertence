<template>
  <div class="container">
    <h1>Workouts</h1>
    <div class="container" v-if="workouts.length">
      {{ authenticated }}
      {{ user }}
      <ul>
        <li v-for="workout in workouts" v-bind:key="workout.id">
          {{ workout.workout }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  beforeMount() {
    if (this.authenticated === false) {
      this.$router.push("/signin");
    }
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log("Component mounted.");
  },
  computed: {
    ...mapGetters("workouts", ["workouts"]),
    ...mapGetters("user", ["authenticated", "user"]),
  },
  created() {
    this.$store.dispatch("workouts/getAllWorkouts");
  },
};
</script>
