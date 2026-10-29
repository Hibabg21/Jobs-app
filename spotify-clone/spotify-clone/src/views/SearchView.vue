<template>
  <input v-model="query" class="search" placeholder="What do you want to play?" />
  <TrackRow v-for="(s, i) in results" :key="s.id" :song="s" :index="i"
            :active="player.currentSong.id === s.id" @play="player.playSong(s.id - 1)" />
</template>

<script setup>
import { ref, computed } from 'vue'
import TrackRow from '@/components/TrackRow.vue'
import { songs } from '@/data/songs'
import { usePlayerStore } from '@/stores/player'

const player = usePlayerStore()
const query = ref('')
const results = computed(() => {
  const q = query.value.toLowerCase()
  return songs.filter(s => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q))
})
</script>

<style scoped>
.search { width: 360px; padding: 12px 16px; border-radius: 500px; border: none; outline: none;
          background: #242424; color: #fff; margin-bottom: 24px; }
</style>