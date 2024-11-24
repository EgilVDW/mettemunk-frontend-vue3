<template>
	<div class="row">
		<div id="downloads" class="downloads col-lg-7 offset-lg-2">
			<ul class="reset-ul">
				<li class="downloads__link c-pt-reset">
					<h2 class="h3 downloads__headline c-mt-reset">Downloads</h2>
				</li>
				<li v-for="(item, index) in data" :key="index" class="downloads__item">
					<a
						:href="item.url"
						target="_blank"
						class="downloads__link flex flex-space-between flex-vertical-center"
					>
						<h3 v-if="item.title" class="text-small c-my-reset">{{ item.title }}</h3>
						<nuxt-icon name="icon-download" class="downloads__icon" />
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { IFile } from "~/interfaces/ui";

defineProps({
	data: {
		type: Array as PropType<IFile[]>,
		default: null,
	}
});
</script>
<style lang="scss" src="./productDownloads.scss"></style>
