<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import FilterNav from '../components/FilterNav.vue'
import JobDetail from '../components/JobDetail.vue'

const jobs = ref([])
const selected = ref(null)
const search = ref('')

const load = async () => (jobs.value = (await axios.get('http://localhost:3000/jobs')).data)
onMounted(load)

const filtered = computed(() =>
  jobs.value.filter(j => j.title.toLowerCase().includes(search.value.toLowerCase()))
)

const remove = async (id) => {
  if (confirm('Voulez-vous vraiment supprimer cet emploi ?')) {
    await axios.delete(`http://localhost:3000/jobs/${id}`)
    selected.value = null
    load()
  }
}
</script>

<template>
  <RouterLink to="/add"><button>+ Ajouter un emploi</button></RouterLink>
  <FilterNav v-model="search" />
  <ul>
    <li v-for="j in filtered" :key="j.id" @click="selected = j">{{ j.title }}</li>
  </ul>
  <JobDetail v-if="selected" :job="selected" @delete="remove" />
</template>