<script>
import FlagImage from '../components/FlagImage.vue'
import InfoItem from '../components/InfoItem.vue'
import StateMessage from '../components/StateMessage.vue'
import { API_URL, extraireListe, normaliser, formaterNombre } from '../api'

export default {
  components: { FlagImage, InfoItem, StateMessage },
  data() {
    return { country: null, tous: [], loading: false, error: null }
  },
  computed: {
    voisins() {
      if (!this.country) return []
      return this.country.frontieres
        .map(code => this.tous.find(p => p.code === code))
        .filter(Boolean)
    },
    superficie() {
      return this.country.superficie ? formaterNombre(this.country.superficie) + ' km²' : '—'
    },
    population() {
      return formaterNombre(this.country.population)
    }
  },
  methods: {
    async chargerPays() {
      this.loading = true
      this.error = null
      try {
        const code = this.$route.params.code
        const reponse = await fetch(API_URL)
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`)
        this.tous = extraireListe(await reponse.json()).map(normaliser)
        this.country = this.tous.find(p => p.code === code)
        if (!this.country) throw new Error('Pays introuvable')
      } catch (e) {
        this.error = 'Unable to load this country.'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.chargerPays()
  },
  watch: {
    // Navigation d'un pays à un autre (voisins) : le composant est réutilisé
    '$route.params.code'() {
      this.chargerPays()
    }
  }
}
</script>

<template>
  <div class="container page">
    <RouterLink to="/" class="btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
      Back to countries
    </RouterLink>

    <StateMessage v-if="loading" type="loading" message="Loading country..." />
    <StateMessage v-else-if="error" type="error" :message="error" @retry="chargerPays" />

    <article v-else-if="country" class="detail">
      <section class="top">
        <div class="top__flag">
          <FlagImage
            :key="country.code"
            :sources="[country.drapeauSvg, country.drapeauPng]"
            :emoji="country.emoji"
            :alt="'Flag of ' + country.nom"
            fit="contain"
          />
        </div>
        <div class="top__text">
          <h1>{{ country.nom }}</h1>
          <p class="official">{{ country.nomOfficiel }}</p>
        </div>
      </section>

      <section class="stats">
        <InfoItem label="Capital" :value="country.capitale">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18"/></svg>
          </template>
        </InfoItem>
        <InfoItem label="Region" :value="country.region + ' · ' + country.sousRegion">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>
          </template>
        </InfoItem>
        <InfoItem label="Population" :value="population">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 5a3 3 0 0 1 0 6M18 14.5c1.8.8 3 2.6 3 5.5"/></svg>
          </template>
        </InfoItem>
        <InfoItem label="Area" :value="superficie">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
          </template>
        </InfoItem>
        <InfoItem label="Currency" :value="country.monnaies">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>
          </template>
        </InfoItem>
        <InfoItem label="Languages" :value="country.langues">
          <template #icon>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h16v11H9l-5 4V5z"/></svg>
          </template>
        </InfoItem>
      </section>

      <section class="borders">
        <h2>Bordering countries</h2>
        <div v-if="voisins.length" class="borders__list">
          <RouterLink v-for="v in voisins" :key="v.code" :to="'/pays/' + v.code" class="border">
            <span>{{ v.emoji }}</span> {{ v.nom }}
          </RouterLink>
        </div>
        <p v-else class="none">No land borders.</p>
      </section>
    </article>
  </div>
</template>

<style scoped>
.page { padding-top: 32px; padding-bottom: 72px; }
.detail { animation: fadeUp 0.5s ease both; }

.top {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  margin: 32px 0 28px;
}
.top__flag {
  position: relative;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(36, 76, 59, 0.15);
}
.top__text h1 { font-size: clamp(2.4rem, 6vw, 4rem); }
.official {
  margin: 12px 0 0;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--beige);
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.5rem;
  color: var(--text);
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 40px;
  background: var(--card);
  border: 1px solid var(--beige);
  border-radius: var(--radius);
  padding: 4px 28px;
  box-shadow: var(--shadow);
}
.stats > * { border-bottom: 1px solid var(--beige); }
.stats > *:nth-last-child(-n + 2) { border-bottom: none; }

.borders { margin-top: 40px; }
.borders h2 { font-size: 1.5rem; margin-bottom: 16px; }
.borders__list { display: flex; flex-wrap: wrap; gap: 10px; }
.border {
  padding: 8px 18px;
  background: var(--card);
  border: 1px solid var(--beige);
  border-radius: 999px;
  font-size: 0.92rem;
  transition: all 0.2s ease;
}
.border:hover { background: var(--green); border-color: var(--green); color: #fff; transform: translateY(-2px); }
.none { color: var(--muted); }

@media (max-width: 760px) {
  .top { grid-template-columns: 1fr; gap: 24px; }
  .stats { grid-template-columns: 1fr; padding: 4px 20px; }
  .stats > *:nth-last-child(2) { border-bottom: 1px solid var(--beige); }
}
</style>
