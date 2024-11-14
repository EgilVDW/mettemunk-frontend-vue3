<template>
  <div
    v-if="data"
    class="seventy-block row"
    :class="{ 'is-reversed': data.direction }"
  >
    <!-- Image -->
    <div class="seventy-block__image col-md-9 col-12">
      <div :id="'seventy-thirty-mobile-' + data.title"></div>
      <DatocmsImage v-if="data.image" :data="data.image.responsiveImage" />
    </div>

    <!-- Text content -->
    <div
      class="seventy-block__content col-md-3 col-12 flex-horizontal-center flex-vertical-direction"
    >
      <!-- Move content in column layout on mobile -->
      <Teleport
        :disabled="mq !== 'mobile'"
        :to="'#seventy-thirty-mobile-' + data.title"
      >
        <h2 v-if="data.title" class="h2 h2--light c-mb-l c-mt-reset">
          {{ data.title }}
        </h2>
      </Teleport>
      <p
        v-if="data.description"
        class="text-default text-default--light c-mt-reset c-mb-xl"
      >
        {{ data.description }}
      </p>
      <BaseLink class="base-link--primary" :link="data.link" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ISeventyThirtyBlock } from "~/interfaces/blocks";
const mq = computed(() => {
  if (window && window.innerWidth < 768) {
    return "mobile";
  } else {
    return "desktop";
  }
});

defineProps({
  data: {
    type: Object as PropType<ISeventyThirtyBlock>,
    required: true,
  },
  uniqueId: {
    type: String,
    required: true,
  },
});
</script>
<style lang="scss" src="./seventyThirtyBlock.scss"></style>
