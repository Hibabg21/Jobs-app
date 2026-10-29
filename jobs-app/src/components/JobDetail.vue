<script setup>
defineProps(['job'])
defineEmits(['delete'])
</script>
<template>
  <div>
    <h2>{{ job.title }}</h2>
    <p>{{ job.description }}</p>
    <p>Salaire: {{ job.salary }} MAD | Expérience: {{ job.experience }} ans</p>
    <p>Créé le: {{ job.createdAt }}</p>
    <RouterLink :to="`/jobs/${job.id}`"><button>Modifier</button></RouterLink>
    <button @click="$emit('delete', job.id)">Supprimer</button>
  </div>
</template>