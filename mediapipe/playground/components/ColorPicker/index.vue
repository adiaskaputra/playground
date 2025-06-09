<script lang="ts" setup>
// const colorList = shallowRef(["system", "light", "dark", "sepia"]);
const colorList = shallowRef(['light', 'sepia'])
</script>

<template>
  <div class="box">
    <div class="box__title">Change color mode</div>
    <div class="box__option">
      <div v-for="color of colorList" :key="color">
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
  @apply bg-gray-100;

  &__title {
    @apply text-lg font-semibold text-center mb-2;
  }
  &__option {
    @apply flex items-center justify-center p-2 gap-4;
  }
}
</style>
