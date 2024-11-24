<template>
	<main v-if="page">
		<BannerSimple :page="page" />
		<ContentLayout>
			<template #breadcrumbs>
				<Breadcrumbs :data="breadcrumbs" :is-dark="true" />
			</template>
			<CardListBlock :data="page.items" :not-modular="true" />
		</ContentLayout>
	</main>
</template>
<script setup lang="ts">
import { generateHead } from "~/utils/generateHead";
import type { ICategoryListPage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";

const { currentRoute } = useRouter();
const props = defineProps({
	page: {
		type: Object as PropType<ICategoryListPage>,
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
