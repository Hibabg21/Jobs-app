<template>
  <div class="app">
    <Sidebar class="sidebar" />
    <main class="content">
      <TopBar />
      <div class="page"><RouterView /></div>
    </main>
    <PlayerBar class="player" />
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'
import PlayerBar from '@/components/layout/PlayerBar.vue'
</script>

<style>
.app {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: 1fr 90px;
  grid-template-areas: "sidebar content" "player player";
  height: 100vh; gap: 8px; padding: 8px;
}
.sidebar { grid-area: sidebar; overflow: hidden; }
.content { grid-area: content; background: var(--surface); border-radius: 8px; overflow-y: auto; }
.player  { grid-area: player; }
.page { padding: 0 24px 24px; }
</style>