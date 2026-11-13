<script>
import AppHeader from './components/AppHeader.vue'

export default { components: { AppHeader } }
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="layout__main">
      <RouterView />
    </main>
    <footer class="footer">
      <div class="container">Pays Explorator &nbsp;•&nbsp; Discover the world</div>
    </footer>
  </div>
</template>

<style scoped>
.layout { min-height: 100vh; display: flex; flex-direction: column; }
.layout__main { flex: 1; }
.footer {
  border-top: 1px solid var(--beige);
  padding: 22px 0;
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
}
</style>
