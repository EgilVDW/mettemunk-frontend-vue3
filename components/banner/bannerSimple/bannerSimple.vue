<template>
	<div class="banner banner--simple flex-vertical-end">
		<div class="banner__image-wrapper">
			<MuxVideo v-if="page.bannerVideo" :video-item="page.bannerVideo" />
			<DatocmsImage
				v-else-if="page.bannerImage.responsiveImage"
				class="banner__image"
				:data="page.bannerImage.responsiveImage"
				layout="responsive"
			/>
		</div>
		<div class="main-grid banner__content-wrapper">
			<div class="row">
				<div class="banner__content col-md-6 col-12">
					<h1 class="banner__headline c-mt-reset">{{ page.bannerTitle }}</h1>
					<p class="text-teaser text-teaser--light c-mb-reset c-mt-reset">
						{{ page.bannerSubTitle }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { ICmsBannerPage } from "~/interfaces/cms/cmsPages";

defineProps({
	page: {
		type: Object as PropType<ICmsBannerPage>,
		default: null,
	}
});
</script>
<style lang="scss" src="../banner.scss"></style>
