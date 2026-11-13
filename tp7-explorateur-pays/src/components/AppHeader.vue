<script>
export default {
  computed: {
    surAbout() {
      return this.$route.path.startsWith('/about')
    }
  }
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink to="/" class="logo">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="9.5" />
          <ellipse cx="12" cy="12" rx="4" ry="9.5" />
          <path d="M2.5 12h19M4 7h16M4 17h16" />
        </svg>
        <span>Pays Explorator</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav__link" :class="{ 'nav__link--active': !surAbout }">Countries</RouterLink>
        <RouterLink to="/about" class="nav__link" :class="{ 'nav__link--active': surAbout }">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(248, 246, 240, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--beige);
}
.header__inner { display: flex; align-items: center; justify-content: space-between; height: 68px; }
.logo { display: flex; align-items: center; gap: 10px; color: var(--green); }
.logo span { font-family: var(--serif); font-size: 1.7rem; font-weight: 600; }
.nav { display: flex; gap: 6px; }
.nav__link {
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 0.92rem;
  transition: background 0.2s ease, color 0.2s ease;
}
.nav__link:hover { background: var(--beige); }
.nav__link--active { background: var(--green); color: #fff; }
.nav__link--active:hover { background: var(--green); }
</style>
