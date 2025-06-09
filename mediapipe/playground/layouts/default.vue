<script lang="ts" setup>
import type { IMenu } from '@/types/index'
import { MENU } from '@/constants/menu'

const route = useRoute()
const router = useRouter()

const getMenu = computed<IMenu>(() => {
  const _defaultResult: IMenu = { label: '' }

  if (route.name === 'index') return _defaultResult

  const label = route.path.split('/')[1]
  const path = route.path.split('/')[2]

  return MENU[label].find((e) => e.path === path) || _defaultResult
})

const getLabel = computed(() => getMenu.value.label)
const getCaption = computed(() => getMenu.value.caption)

function backToMenu() {
  router.push('/')
}
</script>

<template>
  <div class="layout">
    <ColorPicker />
    <div v-if="getLabel" class="layout__header">
      <div class="w-[100px]">
        <UButton
          :ui="{ rounded: 'rounded-full' }"
          size="md"
          color="black"
          @click.stop="backToMenu()"
        >
          <Icon name="uil:angle-left-b" class="pr-1 text-[20px]" /></UButton>
      </div>
      <div class="layout__header__title">
        <div>{{ getLabel }}</div>
        <div class="text-sm">{{ getCaption }}</div>
      </div>
      <div class="w-[100px]"></div>
    </div>
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.layout {
  @apply flex h-full flex-col;
  &__header {
    @apply flex justify-between items-center;
    @apply rounded-lg py-6 px-16 mt-6;
    &__title {
      @apply text-gray-700 font-bold text-[20px] md:text-[26px] text-center;
      @apply capitalize;
    }
  }
  &__content {
    @apply h-full py-6 px-16;
    @apply overflow-y-auto;
  }
}
</style>
