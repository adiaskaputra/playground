<script setup lang="ts">
const sort = ref<{ column: string, direction: 'asc' | 'desc' }>({
  column: 'name',
  direction: 'desc',
})

const columns = [
  {
    label: 'Name',
    key: 'name',
    sortable: true,
  },
]

const people = [
  {
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin',
  },
]
</script>

<template>
  <UTable :sort="sort" :columns="columns" :rows="people" />
</template>
