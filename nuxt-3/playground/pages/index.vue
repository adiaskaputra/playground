<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="box">
    <div class="box__item">
      <div class="box__item__title">Other</div>
      <div class="flex justify-center items-center flex-wrap gap-3">
        <UButton label="Cookie" @click="router.push('/cookie')" />
        <UButton label="Cors" @click="router.push('/cors')" />
        <UButton label="SSE" @click="router.push('/sse')" />
      </div>
    </div>
    <div class="box__item">
      <div class="box__item__title">Firebase</div>
      <div class="flex justify-center items-center flex-wrap gap-3">
        <UButton label="Firestore" @click="router.push('/vuefire/firestore')" />
        <UButton label="RTDB Todo" @click="router.push('/vuefire/rt-todo')" />
        <UButton label="RTDB" @click="router.push('/vuefire/rt')" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.box {
  @apply flex flex-col gap-5;
  &__item {
    &__title {
      @apply font-semibold text-center mb-2;
    }
  }
}
</style>
