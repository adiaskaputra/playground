<script setup lang="ts">
import { ref as dbRef } from "firebase/database";
import { useDatabase, useDatabaseObject } from "vuefire";

const db = useDatabase();
const todoRef = dbRef(db, "todos/" + "9c5c3e38-b48e-4f67-919d-83ab1638a157");

const todo = useDatabaseObject(todoRef);
</script>

<template>
  <div><spam class="font-bold">todoRef:</spam> {{ todoRef }}</div>

  <div class="mt-5">
    <div class="font-bold">Data:</div>
    {{ todo }}
  </div>
</template>
