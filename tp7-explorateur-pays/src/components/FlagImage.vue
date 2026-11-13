<script>
// Essaie chaque URL de "sources" dans l'ordre, puis affiche l'émoji si tout échoue.
export default {
  props: {
    sources: { type: Array, default: () => [] },
    emoji: String,
    alt: String,
    fit: { type: String, default: 'cover' }
  },
  data() {
    return { index: 0 }
  },
  computed: {
    src() {
      return this.sources.filter(Boolean)[this.index]
    }
  }
}
</script>

<template>
  <div class="flag">
    <img v-if="src" :src="src" :alt="alt" loading="lazy" :style="{ objectFit: fit }" @error="index++" />
    <span v-else class="flag__emoji">{{ emoji }}</span>
  </div>
</template>

<style scoped>
.flag {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--beige);
  overflow: hidden;
}
.flag img { width: 100%; height: 100%; display: block; }
.flag__emoji { font-size: 3.2rem; line-height: 1; }
</style>
