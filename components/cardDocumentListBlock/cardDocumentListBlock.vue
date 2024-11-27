<template>
	<ul class="document-list reset-ul row">
		<li v-for="item in data" :key="item.title" class="document-card col-lg-4 col-md-6 col-12">
			<div class="document-card__wrapper flex flex-vertical-direction">
				<DatocmsImage v-if="item.image" class="document-card__image" :data="item.image.responsiveImage" layout="responsive" />
				<div
					v-if="isLargeScreen"
					class="document-card__text-content flex-vertical-direction flex-space-between"
				>
					<div>
						<h2 class="h3 h3--light c-mb-l c-mt-reset">{{ item.title }}</h2>
						<p class="text-default text-default--light c-mt-reset">{{ item.description }}</p>
					</div>
					<a
						v-if="item.file"
						class="document-card__link text-cta text-cta--light flex flex-vertical-center"
						:href="item.file.url"
						target="_blank"
					>
						ÅBEN KATALOG ONLINE
						<nuxt-icon name="icon-external" />
					</a>
				</div>
				<div v-else>
					<a
						v-if="item.file"
						class="document-card__link text-cta text-cta--light flex flex-vertical-center"
						:href="item.file.url"
						target="_blank"
					>
						<h2 class="text-cta text-cta--light c-my-l c-ml-l">ÅBEN KATALOG ONLINE</h2>
						<nuxt-icon name="icon-external" />
					</a>
				</div>
			</div>
		</li>
	</ul>
</template>
<script setup lang="ts">
import { useMediaQueryCustom } from "~/composable/useMediaQueryCustom";
import type { ICardDocumentBlock } from "~/interfaces/blocks";

const { isLargeScreen } = useMediaQueryCustom();

defineProps({
	data: {
		type: Array as PropType<ICardDocumentBlock[]>
	}
});
</script>
<style lang="scss" src="./cardDocumentListBlock.scss"></style>
