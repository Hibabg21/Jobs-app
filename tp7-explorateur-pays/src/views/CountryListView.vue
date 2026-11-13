<script>
import CountryCard from '../components/CountryCard.vue'
import SearchBar from '../components/SearchBar.vue'
import RegionFilter from '../components/RegionFilter.vue'
import StateMessage from '../components/StateMessage.vue'
import { API_URL, REGIONS, extraireListe, normaliser } from '../api'

export default {
  components: { CountryCard, SearchBar, RegionFilter, StateMessage },
  data() {
    return {
      countries: [],
      recherche: '',
      regionActive: 'All',
      regions: REGIONS,
      loading: false,
      error: null
    }
  },
  computed: {
  paysAffiches() {
    const texte = this.recherche.trim().toLowerCase()
    const liste = this.countries.filter(country => {
      const bonneRegion = this.regionActive === 'All' || country.region === this.regionActive
      const bonNom = country.nom?.toLowerCase().includes(texte)
      return bonneRegion && bonNom
    })
    if (!texte) return liste
    // les noms qui commencent par le texte passent en premier
    return [...liste].sort((a, b) => {
      const pa = a.nom.toLowerCase().startsWith(texte) ? 0 : 1
      const pb = b.nom.toLowerCase().startsWith(texte) ? 0 : 1
      return pa - pb
    })
  }
  },
  methods: {
    async chargerPays() {
      this.loading = true
      this.error = null
      try {
        const reponse = await fetch(API_URL)
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`)
        const json = await reponse.json()
        this.countries = extraireListe(json).map(normaliser)
      } catch (e) {
        this.error = 'Unable to load the countries. Please check your connection.'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.chargerPays()
  }
}
</script>

<template>
  <div class="container">
    <section class="hero">
      <h1>Explore the world</h1>
      <p>Discover countries, cultures and places around the globe.</p>
      <SearchBar v-model="recherche" />
      <RegionFilter v-model="regionActive" :regions="regions" />
    </section>

    <StateMessage v-if="loading" type="loading" />
    <StateMessage v-else-if="error" type="error" :message="error" @retry="chargerPays" />

    <template v-else>
      <p class="count">{{ paysAffiches.length }} {{ paysAffiches.length > 1 ? 'countries' : 'country' }}</p>
      <div v-if="paysAffiches.length" class="grid">
        <CountryCard v-for="c in paysAffiches" :key="c.code" :country="c" />
      </div>
      <p v-else class="empty">No country matches your search.</p>
    </template>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 64px 0 36px;
  display: grid;
  gap: 22px;
  background: radial-gradient(ellipse at 50% 0%, rgba(36, 76, 59, 0.07), transparent 65%);
}
.hero h1 { font-size: clamp(2.4rem, 6vw, 4rem); letter-spacing: -0.5px; }
.hero p { margin: 0; color: var(--muted); font-size: 1.1rem; }

.count { margin: 12px 0 20px; font-size: 0.9rem; color: var(--muted); }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding-bottom: 64px;
}
.empty { text-align: center; padding: 60px 0; color: var(--muted); }
</style>
