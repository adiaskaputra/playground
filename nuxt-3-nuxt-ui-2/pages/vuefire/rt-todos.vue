<script setup lang="ts">
import { push, remove, ref as dbRef, serverTimestamp, update } from "firebase/database";
import { ref } from "vue";
import { useDatabase, useList } from "vuefire";
import type { Todo } from "@/components/TodoItem.vue";
const config = useRuntimeConfig();

const db = useDatabase();
const todosRef = dbRef(db, config.public.pathRtdb);

// TODO:
// const finishedTodos = query(todosRef, where('finished', '==', true))
// const unfinishedTodos = query(todosRef, where('finished', '==', false))

const todos = useList<Todo>(todosRef);

const newTodoText = ref("");

function addTodo() {
  if (newTodoText.value) {
    push(todosRef, {
      text: newTodoText.value,
      finished: false,
      created: serverTimestamp(),
    });
    newTodoText.value = "";
  }
}

function updateTodo(id: string, newTodo: Todo) {
  update(dbRef(db, `${config.public.pathRtdb}/` + id), newTodo);
}

function removeTodo(id: string) {
  remove(dbRef(db, `${config.public.pathRtdb}/` + id));
}
</script>

<template>
  <div>
    <div class="font-bold text-sm mb-4">LIST</div>
    <div class="my-4 flex gap-2">
      <UInput v-model.trim="newTodoText" placeholder="Add new data" />
      <UButton @click="addTodo">Add Data</UButton>
    </div>

    <div class="flex flex-col gap-2">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @delete="removeTodo"
        @update:todo="updateTodo"
      />
    </div>
  </div>
</template>
