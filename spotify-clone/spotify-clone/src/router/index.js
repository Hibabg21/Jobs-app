import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/search', component: () => import('@/views/SearchView.vue') },
    { path: '/playlist/:id', component: () => import('@/views/PlaylistView.vue') },
  ],
})