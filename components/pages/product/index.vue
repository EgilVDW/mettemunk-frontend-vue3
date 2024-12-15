<template>
	<main v-if="page">
		 <ContentLayoutSimple>
			<template #breadcrumb>
				<Breadcrumbs :data="breadcrumbs" />
			</template>
			<div class="row l-mb-l">
				<ProductAnchor v-if="!isLargeScreen" :data="anchorSection" />
				<ProductSlider v-if="page.images" :data="page.images" />
				<ProductAnchor v-if="isLargeScreen" :data="anchorSection" />
			</div>
			<LazyProductRemarks v-if="page.labels" :data="page.labels" :id="page.id" />
			<LazyProductDownloads v-if="page?.downloads" :data="page.downloads" />
		</ContentLayoutSimple> 
	</main>
</template>
<script setup lang="ts">
import { useMediaQueryCustom } from "~/composable/useMediaQueryCustom";
import { generateHead } from "~/utils/generateHead";
import type { IProductPage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";

const { isLargeScreen } = useMediaQueryCustom();

const { currentRoute } = useRouter();
const props = defineProps({
	page: {
		type: Object as PropType<IProductPage>,
		default: null,
	},
	breadcrumbs: {
		type: Array as PropType<ILink[]>,
		required: true,
	}
});

useHead(() => {
	return generateHead(currentRoute.value.path, props.page);
});

const anchorSection = computed(() => {
	return {
		title: props.page?.title,
		document: props.page?.document,
		description: props.page?.description,
	};
});
</script>
