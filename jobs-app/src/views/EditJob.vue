<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const job = ref({
  title: '',
  description: '',
  salary: 0,
  createdAt: '',
  experience: 0
})

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/jobs/${route.params.id}`)
  job.value = res.data
})

const save = async () => {
  await axios.put(`http://localhost:3000/jobs/${route.params.id}`, job.value)
  router.push('/')
}
</script>

<template>
  <h1>Modifier l'emploi</h1>
  <form @submit.prevent="save">
    <input v-model="job.title" placeholder="Titre" required />
    <textarea v-model="job.description" placeholder="Description" />
    <input v-model.number="job.salary" type="number" placeholder="Salaire" />
    <input v-model="job.createdAt" type="date" />
    <input v-model.number="job.experience" type="number" placeholder="Années d'expérience" />
    <button>Enregistrer</button>
  </form>
</template>