<template>
	<main v-if="data.page">
		<ContentLayoutSimple>
			<template #breadcrumb>
				<Breadcrumbs :data="data.breadcrumbs" />
			</template>
			<ContactIntro v-if="data.page.showTop" :data="data.page" />

			<ContactList
				v-for="(department, index) in data.page.departments"
				:key="department.name + index"
				:data="department"
			/>
		</ContentLayoutSimple>
	</main>
</template>
<script lang="ts">
import { generateHead } from "~/utils/generateHead";
import type { IContactPage } from "~/interfaces/pages";
import type { ILink } from "~/interfaces/ui";
import { useRouter } from "vue-router"; // ???

export default defineNuxtComponent({
    setup() {
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
        })
    }
});
</script>
