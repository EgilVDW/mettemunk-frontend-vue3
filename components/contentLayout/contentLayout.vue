<template>
  <div
    id="main"
    class="grid-wrapper"
    :class="{ 'grid-wrapper--light': lightTheme }"
  >
    <div v-if="$slots['breadcrumbs']" class="main-grid">
      <slot name="breadcrumbs"></slot>
    </div>
    <div class="main-grid l-pt-xl l-pb-xxl">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  lightTheme: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="scss" src="./contentLayout.scss"></style>
