<template>
  <div class="row" :class="{ active }" @dblclick="$emit('play')">
    <span class="num">{{ index + 1 }}</span>
    <div class="info">
      <img :src="song.cover" />
      <div>
        <div class="title">{{ song.title }}</div>
        <div class="artist">{{ song.artist }}</div>
      </div>
    </div>
    <span class="album">{{ song.album }}</span>
    <span class="dur">{{ Math.floor(song.duration / 60) }}:{{ String(song.duration % 60).padStart(2, '0') }}</span>
  </div>
</template>

<script setup>
defineProps({ song: Object, index: Number, active: Boolean })
defineEmits(['play'])
</script>

<style scoped>
.row { display: grid; grid-template-columns: 40px 4fr 3fr 1fr; align-items: center; padding: 8px 16px; border-radius: 4px; color: var(--text-sub); }
.row:hover { background: rgba(255,255,255,.1); }
.row.active .title { color: var(--green); }
.info { display: flex; align-items: center; gap: 12px; }
.info img { width: 40px; height: 40px; border-radius: 4px; }
.title { color: var(--text); }
</style>