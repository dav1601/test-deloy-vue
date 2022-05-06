<template>
  <div id="coach_registation">
    <base-card>
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
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
      </section>
    </base-card>
  </div>
</template>
<script>
import CoachForm from "@/components/coaches/CoachForm.vue";
export default {
  components: { CoachForm },
  data() {
    return {
      error: null,
      errorMessage: "",
    };
  },
  methods: {
    saveData: function (data) {
      // eslint-disable-next-line no-unused-vars
      this.$store
        .dispatch("coaches/registerCoach", data)
        // eslint-disable-next-line no-unused-vars
        .then((req) => {
          this.$router.replace({ name: "coaches" });
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {
          this.error = true;
          this.errorMessage = "Register Coach failed";
        });
    },
  },
};
</script>
<style scoped>
</style>