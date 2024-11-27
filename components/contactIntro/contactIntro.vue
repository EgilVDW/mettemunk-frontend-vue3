<template>
	<div v-if="data" class="row contact-intro l-mb-l">
		<div class="contact-intro__text-wrapper col-lg-3 col-md-4">
			<h1 v-if="data.title" class="contact-intro__headline h2 c-mt-reset">{{ data.title }}</h1>
			<CustomStructuredText class="contact-intro__text text-default" :unique-key="data.id" :content="data.content" />
		</div>
		<div class="col-sm-7 col-md-6 offset-lg-3 offset-md-1">
			<DatocmsImage
				v-if="data.image.responsiveImage"
				class="contact-intro__image"
				:data="data.image.responsiveImage"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { IContactPage } from "~/interfaces/pages";

defineProps({
	data: {
		type: Object as PropType<IContactPage>,
		default: null,
	}
});
</script>
<style lang="scss" src="./contactIntro.scss"></style>
