<template>
	<NuxtLink
		v-if="internal"
		class="navigation-link flex-vertical-center"
		:to="link"
		:class="{ 'navigation-link--under-line': underLine }"
	>
		{{ text }}
		<nuxt-icon v-if="icon" name="icon-arrow" class="navigation-link__icon c-ml-s" filled />
	</NuxtLink>
	<a
		v-else
		class="navigation-link flex-vertical-center"
		:href="link"
		:class="{ 'navigation-link--under-line': underLine }"
		target="_blank"
	>
		{{ text }}
		<nuxt-icon v-if="icon" class="navigation-link__icon c-ml-s" name="icon-arrow" filled />
	</a>
</template>
<script setup lang="ts">

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
