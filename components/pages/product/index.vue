<template>
	<main v-if="page">
		<ContentLayoutSimple>
			<template #breadcrumb>
				<Breadcrumbs :data="breadcrumbs" />
			</template>
			<div class="row l-mb-l">
				<PortalTarget v-if="!isLargeScreen" name="product-text"></PortalTarget>
				<ProductSlider v-if="page.images" :data="page.images" />
				<ProductAnchor :data="anchorSection" />
			</div>
			<LazyProductRemarks v-if="page.labels" :data="page.labels" />
			<LazyProductDownloads v-if="page.downloads" :data="page.downloads" />
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

const anchorSection = () => {
	const title = props.page?.title;
	const document = props.page?.document;
	const description = props.page?.description;
	return {
		title,
		document,
		description,
	};
};
</script>
