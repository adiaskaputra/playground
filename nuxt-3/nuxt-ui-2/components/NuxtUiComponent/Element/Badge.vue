<script setup lang="ts"></script>

<template>
  <div class="flex-horiz">
    <UBadge>Badge</UBadge>
    <UBadge label="Badge" />
    <UBadge color="primary" variant="solid">Badge</UBadge>
    <UBadge color="white" variant="solid">Badge</UBadge>
    <UBadge color="black" variant="solid">Badge</UBadge>
    <UBadge :ui="{ rounded: 'rounded-full' }">Badge</UBadge>
    <UBadge
      icon="i-heroicons-rocket-launch"
      size="sm"
      color="primary"
      variant="solid"
      label="Badge"
      :trailing="false"
    />
    <UBadge label="xs" size="xs" />
    <UBadge label="sm" size="sm" />
    <UBadge label="md" size="md" />
    <UBadge label="lg" size="lg" />
  </div>
</template>

<style lang="postcss" scoped></style>
