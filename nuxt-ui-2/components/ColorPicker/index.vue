<script lang="ts" setup></script>

<template>
  <div class="box">
    <div class="box__title">Change color mode</div>
    <div class="box__option">
      <div v-for="color of ['system', 'light', 'dark', 'sepia']" :key="color">
        <component
          :is="`icon-color-mode-${color}`"
          class="cursor-pointer"
          @click="$colorMode.preference = color"
        />
      </div>
      <ColorPickerUi />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.box {
  @apply rounded-lg p-6;

  &__title {
    @apply text-lg font-semibold text-center mb-2;
  }
  &__option {
    @apply flex items-center justify-center p-2 gap-4;
  }
}
</style>
