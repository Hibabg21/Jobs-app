<template>
  <aside class="sidebar">
    <nav class="box">
      <RouterLink to="/"><i class="fa fa-home"></i> Home</RouterLink>
      <RouterLink to="/search"><i class="fa fa-search"></i> Search</RouterLink>
    </nav>
    <section class="box library">
      <h3><i class="fa fa-book"></i> Your Library</h3>
      <RouterLink v-for="p in playlists" :key="p.id" :to="`/playlist/${p.id}`" class="item">
        <img :src="p.cover" />
        <span>{{ p.name }}</span>
      </RouterLink>
    </section>
  </aside>
</template>

<script setup>
import { playlists } from '@/data/playlists'
</script>

<style scoped>
.sidebar { display: flex; flex-direction: column; gap: 8px; }
.box { background: var(--surface); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.library { flex: 1; overflow-y: auto; }
nav a { color: var(--text-sub); font-weight: bold; }
nav a:hover, nav a.router-link-exact-active { color: var(--text); }
h3 { margin: 0; color: var(--text-sub); font-size: 16px; }
.item { display: flex; align-items: center; gap: 12px; padding: 6px; border-radius: 6px; }
.item:hover { background: var(--card-hover); }
.item img { width: 48px; height: 48px; border-radius: 4px; object-fit: cover; }
</style>