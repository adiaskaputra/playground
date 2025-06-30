<script setup lang="ts">
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d',
  },
  {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link',
  },
]

const slotLinks = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Navigation',
  },
  {
    label: 'Breadcrumb',
  },
]

const iconLinks = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Navigation',
  },
  {
    label: 'Breadcrumb',
  },
]

const dividerLinks = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d',
  },
  {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link',
  },
]
</script>

<template>
  <div class="flex-vertic">
    <UBreadcrumb :links="links" />
    <UBreadcrumb
      divider="/"
      :links="[
        { label: 'Home', to: '/' },
        { label: 'Navigation' },
        { label: 'Breadcrumb' },
      ]"
    />

    <!-- SLOT -->
    <UBreadcrumb :links="slotLinks">
      <template #default="{ link, isActive, index }">
        <UBadge
          :color="isActive ? 'primary' : 'gray'"
          class="rounded-full truncate"
        >
          {{ index + 1 }}. {{ link.label }}
        </UBadge>
      </template>
    </UBreadcrumb>

    <!-- ICON -->
    <UBreadcrumb
      :links="iconLinks"
      :divider="undefined"
      :ui="{ ol: 'gap-x-3' }"
    >
      <template #icon="{ link, index, isActive }">
        <UAvatar
          :alt="(index + 1).toString()"
          :ui="{
            background: isActive
              ? 'bg-primary-500 dark:bg-primary-400'
              : undefined,
            placeholder: isActive
              ? 'text-white dark:text-gray-900'
              : !!link.to
                ? 'group-hover:text-gray-700 dark:group-hover:text-gray-200'
                : '',
          }"
          size="xs"
        />
      </template>
    </UBreadcrumb>

    <!-- DIVIDER -->
    <UBreadcrumb :links="dividerLinks" :ui="{ ol: 'gap-x-3', li: 'gap-x-3' }">
      <template #divider>
        <span class="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
      </template>
    </UBreadcrumb>
  </div>
</template>

<style lang="postcss" scoped></style>
