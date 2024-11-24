<template>
	<div>
		<StructuredText :data="content" :render-link-to-record="renderLinkToRecord" />
	</div>
</template>
<script setup lang="ts">
import * as mapper from "~/utils/mapper";

defineProps({
	content: {
		type: String
	},
});

const renderLinkToRecord = (block: { record: { id: string }; children: string[] }) => {
	const url = mapper.getUrl(block.record.id);

	return () => h(
		"nuxt-link",
		{
			attrs: {
				to: url,
			},
		},
		block.children[0]
	);
};
</script>
