<script>
export default {
  props: { label: String, value: String }
}
</script>

<template>
  <div class="info">
    <div class="info__icon"><slot name="icon" /></div>
    <div>
      <div class="info__label">{{ label }}</div>
      <div class="info__value">{{ value }}</div>
    </div>
  </div>
</template>

<style scoped>
.info { display: flex; align-items: flex-start; gap: 16px; padding: 22px 8px; }
.info__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--beige);
  color: var(--green);
}
.info__icon :deep(svg) { width: 22px; height: 22px; }
.info__label { font-size: 0.82rem; color: var(--muted); }
.info__value { font-weight: 600; color: var(--text); }
</style>
