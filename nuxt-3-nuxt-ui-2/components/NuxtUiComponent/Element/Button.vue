<script setup lang="ts"></script>

<template>
  <div class="flex-vertic">
    <div class="flex-horiz">
      <UButton>Button</UButton>
      <UButton label="Button" />
    </div>

    <div>
      <div class="title">Variant</div>
      <div class="flex-horiz">
        <UButton label="Ghost" variant="ghost" />
        <UButton label="Link" variant="link" />
        <UButton label="Outline" variant="outline" />
        <UButton label="Soft" variant="soft" />
        <UButton label="Solid" variant="solid" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
