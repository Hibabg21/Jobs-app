<script>
import FlagImage from './FlagImage.vue'
import { formaterPopulation } from '../api'

export default {
  components: { FlagImage },
  props: { country: { type: Object, required: true } },
  methods: { formaterPopulation }
}
</script>

<template>
  <RouterLink :to="'/pays/' + country.code" class="card">
    <div class="card__flag">
      <FlagImage :sources="[country.drapeauPng]" :emoji="country.emoji" :alt="'Flag of ' + country.nom" />
    </div>

    <div class="card__body">
      <h3>{{ country.nom }}</h3>
      <ul>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
          {{ country.capitale }}
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>
          {{ country.region }}
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5a3 3 0 0 1 0 6M18 14.5c1.8.8 3 2.6 3 5.5"/></svg>
          {{ formaterPopulation(country.population) }}
        </li>
      </ul>
      <span class="card__link">
        Discover more
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 1px solid var(--beige);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  animation: fadeUp 0.5s ease both;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }

.card__flag { position: relative; height: 170px; flex-shrink: 0; border-bottom: 1px solid var(--beige); }
.card__body { display: flex; flex-direction: column; flex: 1; padding: 18px 20px 20px; }
h3 { font-size: 1.35rem; margin-bottom: 10px; }

ul { list-style: none; margin: 0 0 16px; padding: 0; display: grid; gap: 6px; }
li { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--muted); }
li svg { width: 16px; height: 16px; color: var(--green); flex-shrink: 0; }

.card__link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--green);
}
.card__link svg { width: 16px; height: 16px; transition: transform 0.25s ease; }
.card:hover .card__link svg { transform: translateX(5px); }
</style>
