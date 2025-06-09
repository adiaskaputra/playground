<script setup lang="ts">
import { useCookieStore } from "@/stores/cookie";
const cookieStore = useCookieStore();

//  HTTP ONLY can't access via client
const ella = ref();
const ellaHttpOnly = ref();
const getCookie = () => {
  ella.value = useCookie("ella");
  ellaHttpOnly.value = useCookie("ella-http-only");
};

const detail = ref();
const hitApi = async () => {
  const { data } = await useFetch("http://localhost:3000/api/proxy-fetch-api");
  detail.value = data;
};
</script>

<template>
  <h3>COOKIE</h3>
  <h4>HTTP ONLY can't access via client</h4>
  <div>default: {{ ella }}</div>
  <div>http-only: {{ ellaHttpOnly }}</div>
  <button @click="getCookie()">Get Cookie</button>

  <h4>Cookie from store that set on server init plugin</h4>
  <div>cookieStore.myCookie: {{ cookieStore.myCookie }}</div>

  <h4>Cookie from server route api</h4>
  <button @click="hitApi()">Hit Server Route API</button>
  <pre>{{ detail }}</pre>
</template>

<style lang="scss" scoped></style>
