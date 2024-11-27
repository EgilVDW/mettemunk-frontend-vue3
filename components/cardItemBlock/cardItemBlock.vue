<template>
	<li class="default-card col-lg-4 col-md-6 col-12">
		<div class="default-card__wrapper flex flex-vertical-direction">
			<DatocmsImage
				v-if="data.image.responsiveImage"
				class="default-card__image"
				:data="data.image.responsiveImage"
				layout="responsive"
			/>
			<div v-if="isLargeScreen" class="default-card__text-content flex-vertical-direction flex-space-between">
				<div>
					<h2 class="h3 h3--light c-mb-l c-mt-reset">{{ data.title }}</h2>
					<p class="text-default text-default--light c-mt-reset">{{ data.description }}</p>
				</div>
				<NuxtLink
					v-if="data.link"
					class="default-card__link text-cta text-cta--light flex flex-vertical-center"
					:to="data.link.url"
				>
					{{ data.link.text }}
					<nuxt-icon name="icon-arrow" class="navigation-link__icon icon c-ml-s" filled />
				</NuxtLink>
			</div>
			<div v-else>
				<NuxtLink
					v-if="data.link"
					class="default-card__link text-cta text-cta--light flex flex-vertical-center"
					:to="data.link.url"
				>
					<h2 class="text-cta text-cta--light c-my-l c-ml-l">{{ data.title }}</h2>
					<nuxt-icon name="icon-arrow" class="navigation-link__icon icon c-ml-s" filled />
				</NuxtLink>
			</div>
		</div>
	</li>
</template>
<script setup lang="ts">
import type { ICardBlock } from "~/interfaces/blocks";
import { useMediaQueryCustom } from "~/composable/useMediaQueryCustom";

const { isLargeScreen } = useMediaQueryCustom();

defineProps({
	data: {
		type: Object as PropType<ICardBlock>,
		default: null,
	}
});
</script>
<style lang="scss" src="./cardItemBlock.scss"></style>
