<template>
  <div class="card" @click="$router.push(`/playlist/${playlist.id}`)">
    <div class="img-wrap">
      <img :src="playlist.cover" />
      <button class="play-btn" @click.stop="$emit('play')"><i class="fa fa-play"></i></button>
    </div>
    <h4>{{ playlist.name }}</h4>
    <p>{{ playlist.description }}</p>
  </div>
</template>

<script setup>
defineProps({ playlist: Object })
defineEmits(['play'])
</script>

<style scoped>
.card { background: var(--card); padding: 16px; border-radius: 8px; cursor: pointer; transition: background .3s; }
.card:hover { background: var(--card-hover); }
.img-wrap { position: relative; }
img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 6px; }
.play-btn { position: absolute; right: 8px; bottom: 8px; width: 48px; height: 48px; border-radius: 50%;
            background: var(--green); color: #000; opacity: 0; transform: translateY(8px); transition: .3s; }
.card:hover .play-btn { opacity: 1; transform: translateY(0); }
h4 { margin: 12px 0 4px; }
p { margin: 0; color: var(--text-sub); font-size: 14px; }
</style>