<template>
	<main>
		<BannerBannerSimple :page="page" />
		<ContentLayout>
			<template #breadcrumbs>
				<Breadcrumbs :data="breadcrumbs" :is-dark="true" />
			</template>
			<ModularContent v-if="page.modularContent" :data="page.modularContent" />
		</ContentLayout>
	</main>
</template>
<script setup lang="ts">
import { generateHead } from "~/utils/generateHead";
import type { ILandingPage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";

const { currentRoute } = useRouter();
const props = defineProps({
	page: {
		type: Object as PropType<ILandingPage>,
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
