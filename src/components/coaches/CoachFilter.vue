<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="fontend" checked @change="setFilter" />
      <label for="fontend">Fontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter" />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter" />
      <label for="career">Carrer</label>
    </span>
  </base-card>
</template>
<script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        fontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    setFilter(event) {

      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilter = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilter;
      this.$emit("change-filter", updatedFilter);
    },
  },
};
</script>
<style  scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>