<script>
export default {
  props: {
    type: { type: String, default: 'loading' }, // 'loading' | 'error'
    message: String
  },
  emits: ['retry']
}
</script>

<template>
  <div class="state">
    <template v-if="type === 'loading'">
      <div class="spinner" />
      <p>{{ message || 'Loading countries...' }}</p>
    </template>
    <template v-else>
      <p class="state__error">{{ message }}</p>
      <button class="btn" @click="$emit('retry')">Try again</button>
    </template>
  </div>
</template>

<style scoped>
.state { text-align: center; padding: 60px 0; color: var(--muted); }
.state__error { color: #a23b2a; margin-bottom: 16px; }
.spinner {
  width: 38px;
  height: 38px;
  margin: 0 auto 14px;
  border: 3px solid var(--beige);
  border-top-color: var(--green);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
