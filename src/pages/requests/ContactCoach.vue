<template>
  <form @submit.prevent="submitForm">
    <v-text-field v-model.trim="email" label="E-mail"></v-text-field>
    <v-textarea
      autocomplete="Message"
      label="Message"
      v-model.trim="message"
      rows="5"
    ></v-textarea>
    <v-snackbar timeout="5000" :top="true" v-model="error" color="red accent-2">
      {{ messageError }}
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar timeout="5000" :top="true" v-model="success" color="success">
      Send request to coach successfully
      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="success = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <div class="actions mt-4">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      email: "",
      message: "",
      error: false,
      success: false,
      messageError: "",
    };
  },
  methods: {
    submitForm() {
      let regexEmail =
        /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      if (!regexEmail.test(this.email) || this.message == "") {
        this.error = true;
        this.success = false;
        this.messageError = "Email is not valid or empty message";
        return;
      }
      const data = {
        coachId: this.id,
        email: this.email,
        message: this.message,
      };
      // eslint-disable-next-line no-unused-vars
      this.$store.dispatch("requests/contactCoach", data).catch((err) => {
        this.error = true;
        this.success = false;
        this.messageError = "Send contact failed";
      });
      this.error = false;
      this.success = true;
      this.clear();
    },
    clear() {
      this.message = "";
      this.email = "";
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}
.error {
  background: red !important;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>