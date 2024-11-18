<template>
  <div class="modular-content">
    <div
      v-for="(item, index) in data"
      :key="'seven-thirty' + index"
      :class="[
        { 'l-mb-l': index !== data.length - 1 && !lessSpacing },
        { 'l-mb-s': index !== data.length - 1 && lessSpacing },
      ]"
    >
      <LazySeventyThirtyBlock
        v-if="item.type == 'seventy_thirty_block'"
        :data="item"
        :unique-id="index + 'seven-thirty-block'"
      />
      <LazyCardListBlock v-if="item.type == 'card_list_block'" :data="item.cards" />
			<!-- <LazyCardDocumentListBlock v-if="item.type == 'card_list_document_block'" :data="item.cards" />
			<LazyCardArticleListBlock v-if="item.type == 'card_list_article_block'" :data="item.cards" />
			<LazyImageBlock v-if="item.type == 'image_block'" :data="item" />
			<LazyVideoBlock v-if="item.type == 'video_block'" :data="item" />
			<CustomStructuredText v-if="item.type == 'text_block'" :content="item.text" /> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  lessSpacing: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" src="./modularContent.scss"></style>
