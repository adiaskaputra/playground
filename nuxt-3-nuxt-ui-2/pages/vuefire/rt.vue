<script setup lang="ts">
import { ref as dbRef } from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";
const config = useRuntimeConfig();
const route = useRoute();

const db = useDatabase();
const todoRef = dbRef(db, `${config.public.pathRtdbDigitalId}/` + route.query.identifier);

const todo = useDatabaseObject(todoRef);

watch(todo, () => {
  console.log("WATCHER", todo.value);
});
</script>

<template>
  <div><spam class="font-bold">todoRef:</spam> {{ todoRef }}</div>

  <div class="mt-5">
    <div class="font-bold">Data:</div>
    {{ todo }}
  </div>
</template>
