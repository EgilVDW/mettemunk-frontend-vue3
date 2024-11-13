<template>
  <NuxtLink
    v-if="link && link.internal && link.url"
    class="base-link flex-center-center"
    :to="link.url"
    >{{ link.text }}</NuxtLink
  >
  <a v-else-if="link && link.url" :href="link.url" class="base-button">{{
    link.text
  }}</a>
</template>
<script setup lang="ts">
defineProps({
  link: {
    type: Object as PropType<ILink>,
    required: true,
  },
});
</script>
<style lang="scss" src="./baseLink.scss"></style>
