<template>
	<div>
		<LazyMuxVideo :video-item="data.video" :is-inline="true" :autoplay="false" />
		<p class="text-small c-mt-m">{{ data.caption }}</p>
	</div>
</template>
<script setup lang="ts">

defineProps({
	data: {
		type: null,
		default: null,
	}
});
</script>
