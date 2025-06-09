<script setup lang="ts">
import { shallowRef } from 'vue'

const nuxtUiComponent = shallowRef<{ [key: string]: string[] }>({
  data: ['table'],
  element: [
    'accordion',
    'alert',
    'avatar',
    'badge',
    'button',
    'carousel',
    'chip',
    'dropdown',
    'icon',
    'kbd',
    'link',
    'meter',
    'progress',
  ],
  form: [
    'checkbox',
    'date-picker',
    'form',
    'form-group',
    'input',
    'input-menu',
    'radio',
    'radio-group',
    'range',
    'select',
    'select-menu',
    'textarea',
    'toggle',
  ],
  layout: ['card', 'container', 'divider', 'skeleton'],
  navigation: [
    'breadcrumb',
    'command-palette',
    'horizontal-navigation',
    'pagination',
    'tabs',
    'vertical-navigation',
  ],
  overlay: [
    'context-menu',
    'modal',
    'notification',
    'popover',
    'slideover',
    'tooltip',
  ],
})
</script>

<template>
  <div class="box-container">
    <div v-for="(items, label) in nuxtUiComponent" :key="label" class="box">
      <div class="box__title">{{ label }} Components</div>
      <div class="box__content g-content">
        <div v-for="item in items" :key="item" class="item">
          <div class="item__title">{{ item.replace("-", " ") }}</div>
          <component :is="`nuxt-ui-component-${label}-${item}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.box {
  &-container {
    @apply flex flex-col items-start justify-normal gap-12;
    @apply w-full;
  }

  &__title {
    @apply inline-block;
    @apply text-xl font-semibold mb-4 capitalize;
    @apply border-solid border-b-[2px];
  }

  &__content {
    @apply flex flex-col items-start justify-normal gap-12;
    @apply w-full pl-4;
  }

  .item {
    @apply w-full;
    &__title {
      @apply text-lg font-bold mb-4 capitalize;
    }
  }
}
</style>
