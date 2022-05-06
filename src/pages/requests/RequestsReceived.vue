<template>
  <section>
    <base-card>
      <base-spinner v-if="isLoading"></base-spinner>
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
      <header>
        <h2>Request Received</h2>
      </header>
      <ul v-if="hasRequest">
        <request-item
          v-for="(rq, i) in receiverdRequests"
          :key="i"
          :email="rq.userEmail"
          :message="rq.userMessage"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>
<script>
import RequestItem from "@/components/requests/RequestItem.vue";
export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null,
      errorMessage: "",
    };
  },
  created() {
    this.loadRequests();
  },
  computed: {
    receiverdRequests() {
      return this.$store.getters["requests/getRequests"];
    },
    hasRequest() {
      return this.$store.getters["requests/hasRequest"];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      await this.$store
        .dispatch("requests/fetchRequests")
        // eslint-disable-next-line no-unused-vars
        .then((req) => {
          this.isLoading = false;
        })
        .catch((error) => {
          this.error = error.message || "Failed to fetch data";
          this.errorMessage = error.message || "Failed to fetch data";
          this.isLoading = false;
        });
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>