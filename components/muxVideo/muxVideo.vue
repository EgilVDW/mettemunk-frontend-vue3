<template>
  <div class="video flex-center-center" :class="{ 'is-inline': isInline }">
    <video
      v-if="videoItem != null"
      ref="videoItem"
      :controls="!autoplay"
      :src="videoItem.mp4Url"
      :playsinline="autoplay"
      class="video__element"
      :poster="videoItem.thumbnailUrl"
      :loop="autoplay"
      :muted="autoplay"
      :autoplay="autoplay"
      loading="lazy"
    ></video>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  videoItem: {
    type: Object,
    default: null,
  },
  isInline: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
});
</script>
<style lang="scss" src="./muxVideo.scss"></style>
