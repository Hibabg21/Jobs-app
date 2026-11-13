import { createRouter, createWebHistory } from 'vue-router'
import CountryListView from './views/CountryListView.vue'
import CountryDetailView from './views/CountryDetailView.vue'
import AboutView from './views/AboutView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CountryListView },
    { path: '/pays/:code', component: CountryDetailView },
    { path: '/about', component: AboutView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
