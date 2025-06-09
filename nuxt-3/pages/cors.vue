<script setup lang="ts">
let apiUrl = ref("");

const { data, error, execute } = useFetch(apiUrl, {
  immediate: false,
});

const hitApi = (type: string) => {
  const urlList: Record<string, string> = {
    fetch: "http://localhost:5000/with-cors",
    "fetch-alt-proxy": "/alt-proxy/with-cors",
    "fetch-manual-proxy": "/api/proxy/with-cors",
    "fetch-api-route": "http://localhost:3000/api/fetch-api",
  };
  apiUrl.value = urlList[type];
  execute();
};
</script>

<template>
  <div>CORS</div>
  <button class="mr-2" @click="hitApi('fetch')">Fetch</button>
  <button class="mr-2" @click="hitApi('fetch-alt-proxy')">
    Fetch - Alt Proxy
  </button>
  <button class="mr-2" @click="hitApi('fetch-manual-proxy')">
    Fetch - Manual Proxy
  </button>
  <button class="mr-2" @click="hitApi('fetch-api-route')">
    Fetch - API Route
  </button>

  <pre>
    {{ data }}
  </pre>
  <pre class="red">
    {{ error }}
  </pre>
</template>

<style lang="scss" scoped>
.mr-2 {
  margin-right: 8px;
}
.red {
  color: red;
}
</style>
