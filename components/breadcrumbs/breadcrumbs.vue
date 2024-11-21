<template>
	<div v-if="data" class="breadcrumbs" :class="{ 'breadcrumbs--is-dark-themed': isDark }">
		<ul class="reset-ul flex breadcrumbs__list">
			<li v-for="breadcrumb in data" :key="breadcrumb.url" class="breadcrumbs__item">
				<NuxtLink :to="breadcrumb.url" class="breadcrumbs__link text-small">{{ breadcrumb.text }}</NuxtLink>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import type { ILink } from "~/interfaces/ui";

defineProps({
	data: {
		type: Array as PropType<ILink[]>,
		default: null,
	},
	isDark: {
		type: Boolean,
		default: false,
	}
});
</script>
<style lang="scss" src="./breadcrumbs.scss"></style>
