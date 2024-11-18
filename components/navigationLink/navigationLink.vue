<template>
	<NuxtLink
		v-if="internal"
		class="navigation-link flex-vertical-center"
		:to="link"
		:class="{ 'navigation-link--under-line': underLine }"
	>
		{{ text }}
		<IconArrow v-if="icon" class="navigation-link__icon c-ml-s" />
	</NuxtLink>
	<a
		v-else
		class="navigation-link flex-vertical-center"
		:href="link"
		:class="{ 'navigation-link--under-line': underLine }"
		target="_blank"
	>
		{{ text }}
		<IconArrow v-if="icon" class="navigation-link__icon c-ml-s" filled />
	</a>
</template>
<script setup lang="ts">
import IconArrow from "~/assets/icons/icon-arrow.svg";

defineProps({
	link: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	icon: {
		type: Boolean,
		default: false,
	},
	underLine: {
		type: Boolean,
		default: false,
	},
	internal: {
		type: Boolean,
		default: false,
	},
});
</script>
<style src="./navigationLink.scss" scoped lang="scss"></style>
