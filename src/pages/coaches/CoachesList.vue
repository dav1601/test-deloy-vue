<template>
  <div id="coach__list">
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="error"
    >
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="red" dark>Error</v-toolbar>
          <v-card-text>
            <div class="text-h2 pa-12">{{ errorMessage }}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <section>
      <coach-filter @change-filter="setFilters"> </coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <v-btn depressed color="primary" @click="loadCoaches()">
            Refresh
          </v-btn>
          <base-button v-if="!isLoggedIn" :link="true" :to="{ name: 'auth' }"
            >Login</base-button
          >
          <base-button
            v-if="isLoggedIn && !isLoading && !isCoach"
            :link="true"
            :to="{ name: 'register' }"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="(coach, index) in filteredCoaches"
            :key="index"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :desc="coach.description"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <div v-else>
          <h3>No coaches found.</h3>
        </div>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachItem from "@/components/coaches/CoachItem.vue";
import CoachFilter from "@/components/coaches/CoachFilter";
export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      error: null,
      errorMessage: null,
      isLoading: false,
      activeFilters: {
        fontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    listCoaches() {
      return this.$store.getters["coaches/getCoaches"];
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/getCoaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.fontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      console.log(updatedFilters);
      this.activeFilters = updatedFilters;
    },
    test() {
      alert("ok");
    },
    async loadCoaches() {
      this.isLoading = true;
      // eslint-disable-next-line no-unused-vars
      await this.$store
        .dispatch("coaches/loadCoaches")
        // eslint-disable-next-line no-unused-vars
        .then((req) => {
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error.message || "Failed to fetch data";
          this.errorMessage = error.message || "Failed to fetch data";
          this.isLoading = false;
        });

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
ul {
  padding-left: 0;
}
</style>