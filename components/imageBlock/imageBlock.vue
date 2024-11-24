<template>
	<figure class="article-content__image c-mx-reset c-mb-xl">
		<DatocmsImage :data="data.image.responsiveImage" />
		<figcaption class="article-content__image-caption text-small c-mt-m">{{ data.caption }}</figcaption>
	</figure>
</template>
<script setup lang="ts">

defineProps({
	data: {
		type: null,
		default: null,
	}
});
</script>
