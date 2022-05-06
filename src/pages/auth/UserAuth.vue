<template>
  <base-card>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <v-snackbar v-model="errorForm" :top="true">
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="errorForm = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="success" color="success" :top="true">
      {{ messageSuccess }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="success = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <form @submit.prevent="submitForm">
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-text-field
        v-model="password"
        label="password"
        type="password"
      ></v-text-field>
      <v-btn
        depressed
        type="submit"
        color="primary"
        @click="switchAuthMode('login')"
      >
        Login
      </v-btn>
      <v-btn
        @click="switchAuthMode('singup')"
        type="submit"
        depressed
        color="primary"
        class="ml-4"
      >
        Register
      </v-btn>
    </form>
  </base-card>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorForm: false,
      mode: "login",
      errorMessage: "",
      isLoading: false,
      success: false,
      messageSuccess: "",
    };
  },
  methods: {
    async submitForm() {
      if (this.email === "" || this.password === "") {
        this.errorForm = true;
        this.errorMessage = "Email Or Password Empty";
        return;
      }
      if (this.mode == "login") {
        await this.$store
          .dispatch("auth/login", {
            email: this.email,
            password: this.password,
          })
          // eslint-disable-next-line no-unused-vars
          .then((req) => {
            this.isLoading = false;
            this.messageSuccess = "Login Success";
            this.success = true;
            this.$router.replace({ name: "coaches" });
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            this.isLoading = false;
            this.errorForm = true;
            this.errorMessage = "Email or Passowrd not exist";
          });
      } else {
        this.isLoading = true;
        await this.$store
          .dispatch("auth/singup", {
            email: this.email,
            password: this.password,
          })
          // eslint-disable-next-line no-unused-vars
          .then((req) => {
            this.isLoading = false;
            this.messageSuccess = "Singup Success";
            this.success = true;
            this.$router.go(-1);
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            this.isLoading = false;
            this.success = false;
          });
      }
    },
    switchAuthMode(mode) {
      this.mode = mode;
    },
  },
};
</script>
<style scoped>
</style>