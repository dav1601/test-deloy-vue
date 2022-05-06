<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="(area, key) in areas"
          :key="key"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ desc }}</p>
      </base-card>
    </section>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/getCoaches"].find(
      (coach) => coach.id == this.id
    );
    if (!this.selectedCoach) {
      return this.$router.replace({ name: "404" });
    }
  },

  computed: {
    fullName() {
      return this.selectedCoach.firstName + " " + this.selectedCoach.lastName;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    desc() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return this.$router.resolve({
        name: "coach.contact",
        params: { id: this.id },
      }).href;
    },
  },
};
</script>
<style scoped>
p {
  font-size: 20px;
  font-weight: 600;
  padding-left: 10px;
  margin-top: 20px;
}
</style>