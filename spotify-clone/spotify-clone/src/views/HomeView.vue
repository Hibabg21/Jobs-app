<template>
  <h2>Good evening</h2>
  <div class="grid">
    <PlaylistCard v-for="p in playlists" :key="p.id" :playlist="p" @play="playPlaylist(p)" />
  </div>
</template>

<script setup>
import PlaylistCard from '@/components/PlaylistCard.vue'
import { playlists } from '@/data/playlists'
import { usePlayerStore } from '@/stores/player'

const player = usePlayerStore()
function playPlaylist(p) {
  player.playSong(p.songIds[0] - 1)   // simple pour commencer
}
</script>

<style scoped>
.grid { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }
</style>