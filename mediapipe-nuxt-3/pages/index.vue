<script setup lang="ts">
import type { IMenu } from '@/types/index'
import { MENU } from '@/constants/menu'

const router = useRouter()

function redirect(label: string | number, item: IMenu) {
  if (item.path) {
    router.push(`/${label}/${item.path}`)
  }
  if (item.url) {
    window.open(item.url, '_blank').focus()
  }
}
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <div class="flex h-full flex-wrap items-center justify-center gap-9">
      <div v-for="(items, label) in MENU" :key="`menu-${label}`" class="menu-container">
        <div class="menu-container__label">{{ label }}</div>
        <div
          v-for="(item, n) in items"
          :key="`menu-${n}`"
          class="menu"
          @click.stop="redirect(label, item)"
        >
          <div class="menu__label">{{ item.label }}</div>
          <div v-if="item.caption" class="menu__caption">
            {{ item.caption }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.menu {
  @apply py-2 px-4 rounded;
  @apply bg-zinc-100 hover:bg-zinc-200;
  @apply border-solid border-[1px] border-zinc-200;
  @apply cursor-pointer;
  @apply text-center;

  &-container {
    @apply w-[240px] p-4 bg-zinc-50 rounded;
    @apply flex flex-col justify-center gap-3;

    &__label {
      @apply font-bold text-center capitalize;
      @apply text-zinc-800;
    }
  }

  &__label {
    @apply text-zinc-700;
  }
  &__caption {
    @apply mt-1 text-sm italic text-zinc-500;
  }
}
</style>
