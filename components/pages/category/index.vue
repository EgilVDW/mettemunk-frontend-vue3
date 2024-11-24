<template>
	<main v-if="page">
		<BannerSimple :page="page" />
		<ContentLayout>
			<template #breadcrumbs>
				<Breadcrumbs :data="breadcrumbs" :is-dark="true" />
			</template>

			<div>
				<CardListBlock :data="page.products" :not-modular="true" />
			</div>
		</ContentLayout>
	</main>
</template>
<script setup lang="ts">
import { generateHead } from "~/utils/generateHead";
import type { ICategoryPage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";

const { currentRoute } = useRouter();
const props = defineProps({
	page: {
		type: Object as PropType<ICategoryPage>,
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
</script>
