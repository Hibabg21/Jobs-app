import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { songs } from '@/data/songs'

export const usePlayerStore = defineStore('player', () => {
  const audio = new Audio()
  audio.preload = 'auto'

  const queue = ref(songs)
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const isLoading = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(0.7)

  const currentSong = computed(() => queue.value[currentIndex.value])

  audio.addEventListener('timeupdate', () => (currentTime.value = audio.currentTime))
  audio.addEventListener('loadedmetadata', () => (duration.value = audio.duration))
  audio.addEventListener('play', () => (isPlaying.value = true))
  audio.addEventListener('pause', () => (isPlaying.value = false))
  audio.addEventListener('waiting', () => (isLoading.value = true))
  audio.addEventListener('canplay', () => (isLoading.value = false))
  audio.addEventListener('ended', () => next())
  audio.addEventListener('error', () => console.error('Erreur audio:', audio.src, audio.error))

  async function playSong(index) {
    currentIndex.value = index
    audio.src = currentSong.value.src
    audio.volume = volume.value
    isLoading.value = true
    try {
      await audio.play()
    } catch (e) {
      console.error('play() a échoué:', e)
      isLoading.value = false
    }
  }
  function toggle() {
    if (!audio.src) return playSong(currentIndex.value)
    audio.paused ? audio.play() : audio.pause()
  }
  function next() { playSong((currentIndex.value + 1) % queue.value.length) }
  function prev() { playSong((currentIndex.value - 1 + queue.value.length) % queue.value.length) }
  function seek(t) { audio.currentTime = t }
  function setVolume(v) { volume.value = v; audio.volume = v }

  return {
    queue, currentIndex, currentSong,
    isPlaying, isLoading, currentTime, duration, volume,
    playSong, toggle, next, prev, seek, setVolume,
  }
})