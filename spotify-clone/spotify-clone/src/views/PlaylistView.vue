<template>
  <div v-if="playlist">
    <div class="header">
      <img :src="playlist.cover" />
      <div>
        <small>PLAYLIST</small>
        <h1>{{ playlist.name }}</h1>
        <p>{{ playlist.description }} • {{ tracks.length }} titres</p>
      </div>
    </div>

    <TrackRow v-for="(s, i) in tracks" :key="s.id" :song="s" :index="i"
              :active="player.currentSong.id === s.id"
              @play="player.playSong(s.id - 1)" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TrackRow from '@/components/TrackRow.vue'
import { playlists } from '@/data/playlists'
import { songs } from '@/data/songs'
import { usePlayerStore } from '@/stores/player'

const route = useRoute()
const player = usePlayerStore()
const playlist = computed(() => playlists.find(p => p.id === +route.params.id))
const tracks = computed(() => songs.filter(s => playlist.value?.songIds.includes(s.id)))
</script>

<style scoped>
.header { display: flex; align-items: flex-end; gap: 24px; padding: 24px 0; }
.header img { width: 200px; height: 200px; border-radius: 6px; box-shadow: 0 4px 60px rgba(0,0,0,.5); }
h1 { font-size: 56px; margin: 8px 0; }
</style>