<template>
	<main v-if="page">
		<ContentLayoutSimple>
			<h1>{{ page.title }}</h1>
			<CustomStructuredText :content="page.content" :unique-key="page.title"/>
		</ContentLayoutSimple>
	</main>
</template>
<script setup lang="ts">
import * as cmsHelper from '~/resources/datoCmsHelper';
import type { INotFoundPage } from '~/interfaces/pages';

const props = defineProps({
    page: {
        type: Object as PropType<INotFoundPage>,
        default: null,
    },
	error: {
        type: null, 
        required: true,
    }
});

const { data: cmsPage } = await useAsyncData('layout', async () => {
    return await cmsHelper.GetNotFoundPage();
});

const page = computed(() => ({
    title: cmsPage.value?.title,
    content: cmsPage.value?.content,
}));

</script>