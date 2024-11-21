<template>
	<main v-if="page">
		<ContentLayoutSimple>
			<template #breadcrumb>
				<Breadcrumbs :data="breadcrumbs" />
			</template>
			<ContactIntro v-if="page.showTop" :data="page" />

			<ContactList
				v-for="(department, index) in page.departments"
				:key="department.name + index"
				:data="department"
			/>
		</ContentLayoutSimple>
	</main>
</template>
<script lang="ts" setup>
import { generateHead } from "~/utils/generateHead";
import type { IContactPage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";

const { currentRoute } = useRouter();
const props = defineProps({
	page: {
		type: Object as PropType<IContactPage>,
		default: null,
	},
	breadcrumbs: {
		type: Object as PropType<ILink>,
		required: true,
	},
})
useHead(() => {
	return generateHead(currentRoute.value.path, props.page);
});
</script>
