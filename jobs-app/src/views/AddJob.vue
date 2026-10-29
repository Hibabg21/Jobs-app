<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const job = ref({
  title: '',
  description: '',
  salary: 0,
  createdAt: new Date().toISOString().slice(0, 10),
  experience: 0
})

const save = async () => {
  await axios.post('http://localhost:3000/jobs', job.value)
  router.push('/')
}
</script>

<template>
  <h1>Ajouter un emploi</h1>
  <form @submit.prevent="save">
    <input v-model="job.title" placeholder="Titre" required />
    <textarea v-model="job.description" placeholder="Description" />
    <input v-model.number="job.salary" type="number" placeholder="Salaire" />
    <input v-model="job.createdAt" type="date" />
    <input v-model.number="job.experience" type="number" placeholder="Années d'expérience" />
    <button>Ajouter</button>
  </form>
</template>