<template>
  <div class="container">
    <h1>Profile</h1>
    {{ authenticated }}
    {{ user }}
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
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
  created() {},
};
</script>
