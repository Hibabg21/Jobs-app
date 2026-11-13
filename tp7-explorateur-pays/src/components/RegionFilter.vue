<script>
export default {
  props: {
    regions: { type: Array, required: true },
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>

<template>
  <div class="filters" role="group" aria-label="Filter by region">
    <button
      v-for="r in regions"
      :key="r"
      class="chip"
      :class="{ 'chip--active': r === modelValue }"
      @click="$emit('update:modelValue', r)"
    >
      {{ r }}
    </button>
  </div>
</template>

<style scoped>
.filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.chip {
  padding: 8px 20px;
  border: 1px solid var(--beige);
  border-radius: 999px;
  background: var(--card);
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.chip:hover { border-color: var(--green); transform: translateY(-1px); }
.chip--active { background: var(--green); border-color: var(--green); color: #fff; }
</style>
