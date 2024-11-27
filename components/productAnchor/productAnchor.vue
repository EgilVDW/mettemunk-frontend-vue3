<template>
	<div class="product-anchor col-lg-5 half-col flex flex-vertical-direction flex-horizontal-center">
		<Portal to="product-text" :disabled="isLargeScreen">
			<div class="col">
				<h1 class="h2 product-anchor__title c-mt-reset c-mb-l">{{ data.title }}</h1>
				<CustomStructuredText
					v-if="data.description"
					class="c-mb-xl product-anchor__description"
					:content="data.description"
					:unique-key="data.title + 'productAnchor'"
				/>
			</div>
		</Portal>
		<div class="product-anchor__links-wrapper">
			<a
				v-if="data.document"
				:href="data.document.url"
				target="_blank"
				class="product-anchor__link product-anchor__link-download text-highlighted flex-center-center c-mb-xl"
				>{{ dictionary.productOpenFile.toUpperCase() }}
				<nuxt-icon name="icon-external" class="c-ml-s" />
			</a>
			<div class="product-anchor__anchors flex">
				<button
					class="product-anchor__link product-anchor__link product-anchor__link-anchor c-mr-l text-highlighted flex-center-center"
					@click="scrollToSection('#remarks')"
				>
					{{ dictionary.productToLabels.toUpperCase() }}
					<nuxt-icon name="icon-anchorlink" class="c-ml-s" />
				</button>
				<button
					class="product-anchor__link product-anchor__link product-anchor__link-anchor c-ml-l text-highlighted flex-center-center"
					@click="scrollToSection('#downloads')"
				>
					{{ dictionary.productToDownloads.toUpperCase() }}
					<nuxt-icon name="icon-anchorlink" class="c-ml-s" />
				</button>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useGetDictionary } from "~/composable/useGetDictionary";
import { useMediaQueryCustom } from "~/composable/useMediaQueryCustom";
import type { ICmsDictionary } from "~/interfaces/cms/cmsBase";
import type { IAnchorSection } from "~/interfaces/components";

const {getDictionaries} = useGetDictionary() 

const {data: dictionary} = await useAsyncData("dictionary", async () => {
	const d = getDictionaries()
	if(d) {
		return d;
	} 
	return null;

})

defineProps({
	data: {
		type: Object as PropType<IAnchorSection>,
		default: null,
	}
});

const scrollToSection = (htmlEl: string) => {
	const el = document.querySelector(htmlEl);
	if (el) {
		// @ts-ignore
		const offset = this.$mq.includes("desktop") ? 130 : 80;
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = el.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: "smooth",
		});
	}
};
</script>
<style lang="scss" src="./productAnchor.scss"></style>
