<script>
export default {
  props: { modelValue: { type: String, default: '' } },
  emits: ['update:modelValue']
}
</script>

<template>
  <label class="search">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
    <input
      type="search"
      :value="modelValue"
      placeholder="Search a country..."
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<style scoped>
.search {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  padding: 14px 22px;
  background: var(--card);
  border: 1px solid var(--beige);
  border-radius: 999px;
  box-shadow: var(--shadow);
  color: var(--green);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.search:focus-within { border-color: var(--green); box-shadow: 0 0 0 4px rgba(36, 76, 59, 0.1); }
.search input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--text);
}
.search input::placeholder { color: #9aa09a; }
</style>
