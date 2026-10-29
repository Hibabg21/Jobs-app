<template>
  <footer class="bar">
    <div class="left" v-if="player.currentSong">
      <img :src="player.currentSong.cover" />
      <div>
        <div class="title">{{ player.currentSong.title }}</div>
        <div class="artist">{{ player.currentSong.artist }}</div>
      </div>
    </div>

    <div class="center">
      <div class="controls">
        <button @click="player.prev"><i class="fa fa-backward-step"></i></button>
        <button class="main" @click="player.toggle">
          <i :class="player.isLoading ? 'fa fa-spinner fa-spin' : (player.isPlaying ? 'fa fa-pause' : 'fa fa-play')"></i>
        </button>
        <button @click="player.next"><i class="fa fa-forward-step"></i></button>
      </div>
      <div class="progress">
        <span>{{ fmt(player.currentTime) }}</span>
        <input type="range" min="0" :max="player.currentSong.duration"
               :value="player.currentTime" @input="player.seek(+$event.target.value)" />
        <span>{{ fmt(player.currentSong.duration) }}</span>
      </div>
    </div>

    <div class="right">
      <i class="fa fa-volume-high"></i>
      <input type="range" min="0" max="1" step="0.01" :value="player.volume"
             @input="player.setVolume(+$event.target.value)" />
    </div>
  </footer>
</template>

<script setup>
import { usePlayerStore } from '@/stores/player'
const player = usePlayerStore()
const fmt = (s) => `${Math.floor((s || 0) / 60)}:${String(Math.floor((s || 0) % 60)).padStart(2, '0')}`
</script>

<style scoped>
.bar { display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; padding: 0 16px; background: var(--bg); }
.left { display: flex; align-items: center; gap: 12px; }
.left img { width: 56px; height: 56px; border-radius: 4px; }
.title { font-weight: bold; }
.artist { color: var(--text-sub); font-size: 13px; }
.center { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.controls { display: flex; align-items: center; gap: 20px; }
.main { width: 36px; height: 36px; border-radius: 50%; background: #fff; color: #000; }
.progress { display: flex; align-items: center; gap: 8px; width: 100%; font-size: 12px; color: var(--text-sub); }
.progress input { flex: 1; accent-color: var(--green); }
.right { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.right input { width: 100px; accent-color: var(--green); }
</style>