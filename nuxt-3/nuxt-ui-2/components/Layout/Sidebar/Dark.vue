<script setup lang="ts"></script>

<template>
  <div class="sidebar-container">
    <div class="sidebar__top">The App</div>
    <UDivider />
    <div class="sidebar__menu">
      <!-- <a
        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
        href="#"
      >
        <svg
          class="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="ml-2 text-sm font-medium">Dasboard</span>
      </a> -->
    </div>
    <div class="sidebar__bottom">
      <ColorPicker />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.sidebar {
  &-container {
    @apply w-[240px] h-full;
    @apply flex flex-col items-center overflow-hidden;
    @apply text-gray-400 bg-gray-900;
  }

  &__top {
    @apply w-full;
    @apply flex items-center;
    @apply p-3;
  }

  &__menu {
    @apply w-full px-2;
  }

  &__bottom {
    @apply w-full h-16;
    @apply flex items-center justify-center;
    @apply mt-auto;
    @apply bg-gray-800 hover:bg-gray-700 hover:text-gray-300;
  }
}
</style>
