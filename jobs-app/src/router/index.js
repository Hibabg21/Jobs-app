import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/add', component: AddJob },
    { path: '/jobs/:id', component: EditJob }
  ]
})