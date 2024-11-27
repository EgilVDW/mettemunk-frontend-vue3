<template>
	<main v-if="page">
		<BannerBannerSimple :page="page" />
		<ContentLayout :light-theme="true">
			<template #breadcrumbs>
				<div class="row">
					<div class="offset-lg-2 col-lg-7">
						<Breadcrumbs :data="breadcrumbs" :is-dark="false" />
					</div>
				</div>
			</template>

			<div class="row">
				<div class="col-lg-2">
					<div class="seperator-line seperator-line--light c-mt-m"></div>
				</div>
				<div class="col-xl-7 article-content">
					<h2>{{ page.title }}</h2>
					<ModularContent v-if="page.modularContent" :data="page.modularContent" :id="page.id" :less-spacing="true" />
				</div>
			</div>
		</ContentLayout>
	</main>
</template>
<script setup lang="ts">
import { generateHead } from "~/utils/generateHead";
import type { IArticlePage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";

const { currentRoute } = useRouter();
const props = defineProps({
	page: {
		type: Object as PropType<IArticlePage>,
		default: null,
	},
	breadcrumbs: {
		type: Array as PropType<ILink[]>,
		required: true,
	},
	
});

useHead(() => {
	return generateHead(currentRoute.value.path, props.page);
});
</script>
<style src="./article-content.scss" lang="scss"></style>
