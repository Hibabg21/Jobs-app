export const API_URL = 'https://countries.dev/countriesXX'

export const REGIONS = ['All', 'Africa', 'Asia', 'Europe', 'Americas', 'Oceania']

// L'API renvoie directement un tableau de pays
export function extraireListe(json) {
  if (Array.isArray(json)) return json
  return json.countries ?? json.data ?? []
}

// L'API ne fournit pas de champ "nom officiel" : on le cherche dans les
// orthographes alternatives (ex. "Kingdom of Morocco"), sinon on prend le nom natif.
function trouverNomOfficiel(c) {
  const motif = /\b(of|Republic|Kingdom|State|Federation|Commonwealth|Principality|Sultanate|Emirate|Union)\b/
  const candidat = (c.altSpellings ?? []).find(n => n.length > 5 && motif.test(n))
  return candidat ?? c.nativeName ?? c.name
}

export function normaliser(c) {
  return {
    code: c.alpha3Code,
    nom: c.name,
    nomOfficiel: trouverNomOfficiel(c),
    capitale: c.capital ?? '—',
    population: c.population,
    region: c.region ?? '—',
    sousRegion: c.subregion ?? '—',
    superficie: c.area,
    langues: (c.languages ?? []).map(l => l.name).join(', ') || '—',
    monnaies: (c.currencies ?? []).map(m => `${m.name} (${m.symbol})`).join(', ') || '—',
    frontieres: c.borders ?? [],
    drapeauPng: c.flags?.png,
    drapeauSvg: c.flags?.svg,
    emoji: c.flag
  }
}

// 37 800 000 -> "37.8M"
export function formaterPopulation(n) {
  if (n == null) return '—'
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

export function formaterNombre(n) {
  return n == null ? '—' : new Intl.NumberFormat('en-US').format(n)
}
