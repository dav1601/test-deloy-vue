<template>
  <v-app>
    <the-header v-show="$route.name !== '404'"></the-header>
    <v-main>
      <dav-container>
        <v-scroll-x-transition mode="out-in">
          <router-view></router-view>
        </v-scroll-x-transition>
      </dav-container>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: { TheHeader },
  name: "App",
  created() {
    this.$store.dispatch("auth/tryLogin");
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}
ol,
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>
