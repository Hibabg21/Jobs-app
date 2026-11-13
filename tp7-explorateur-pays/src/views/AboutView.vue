<template>
  <div class="container about">
    <h1>About Pays Explorator</h1>
    <p>
      Pays Explorator is a small country explorer built with Vue 3 and Vue Router. Browse every country,
      search by name, filter by region and open a detailed page for each one.
    </p>
    <p>Country data is loaded live from the countries.dev public API.</p>
    <RouterLink to="/" class="btn">Start exploring</RouterLink>
  </div>
</template>

<style scoped>
.about { max-width: 680px; padding-top: 72px; padding-bottom: 96px; display: grid; gap: 18px; justify-items: start; }
.about h1 { font-size: clamp(2.2rem, 5vw, 3.2rem); }
.about p { margin: 0; color: var(--muted); font-size: 1.05rem; }
</style>
