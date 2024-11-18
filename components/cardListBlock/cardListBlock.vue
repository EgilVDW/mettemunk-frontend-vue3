<template>
	<ul class="card-list reset-ul row" :class="{ 'l-pb-l': !notModular }">
		<CardItemBlock v-for="card in data" :key="card.id" :data="card" />
	</ul>
</template>
<script setup lang="ts">
import type { ICardBlock } from "~/interfaces/blocks";

defineProps({
	data: {
		type: Array as PropType<ICardBlock[]>,
		default: null,
	},
	notModular: {
		type: Boolean,
		default: false,
	}
})
</script>
<style lang="scss" src="./cardListBlock.scss"></style>
