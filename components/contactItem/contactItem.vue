<template>
	<li class="contact-item c-mb-xl">
		<div class="contact-item__wrapper">
			<div class="contact-item__image flex-center-center c-mb-l">
				<DatocmsImage v-if="data.image" :data="data.image.responsiveImage" />
			</div>
			<div class="contact-item__text">
				<p v-if="data.name" class="h4 c-mb-s c-mt-reset">{{ data.name }}</p>
				<p v-if="data.title" class="h5 c-mb-s">{{ data.title }}</p>
				<p v-if="data.phone" class="c-my-reset contact-item__text-small">{{ data.phone }}</p>
				<p v-if="data.email" class="c-my-reset contact-item__text-small">{{ data.email }}</p>
			</div>
		</div>
	</li>
</template>
<script setup lang="ts">
import type { IEmployee } from "~/interfaces/blocks";

defineProps({
	data: {
		type: Object as PropType<IEmployee>,
		default: null,
	},
});
</script>

<style lang="scss" src="./contactItem.scss"></style>
