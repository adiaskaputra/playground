<script setup lang="ts">
// PENGGUNAAN USE ROUTE (ex: http://localhost:3000/users-cantik/1?province=bali)
const route = useRoute();

const params = route.params;
const group = params.group || "";
const id = params.id || "";
console.log(`group: ${group} - id: ${id}`);

const query = route.query;
const qProvince = query.province || "";
console.log(`province ${qProvince}`);
</script>

<template>
  <!-- DYNAMIC ROUTE ( ex: http://localhost:3000/users-cantik/1 )-->
  <div>{{ $route.params.group }} - {{ $route.params.id }}</div>
</template>

<style lang="scss" scoped></style>
