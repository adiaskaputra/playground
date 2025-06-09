<script setup lang="ts"></script>

<template>
  <div class="lay">
    <div class="w-[240px] fixed h-full">
      <LayoutSidebarDark />
    </div>
    <div class="lay__content">
      <NuxtUiComponent />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.lay {
  @apply w-full h-full flex justify-between;
  @apply overflow-y-auto;
  &__content {
    @apply w-full h-full;
    @apply ml-[240px];
    @apply px-[48px] py-[52px];
  }
}
</style>
