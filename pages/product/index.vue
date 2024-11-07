<template>
	<main v-if="page">
		<ContentLayoutSimple>
			<template #breadcrumb>
				<Breadcrumbs :data="breadcrumbs" />
			</template>
			<div class="row l-mb-l">
				<PortalTarget v-if="$mq === 'mobile' || $mq === 'tablet'" name="product-text"></PortalTarget>
				<ProductSlider v-if="page.images" :data="page.images" />
				<ProductAnchor :data="anchorSection" />
			</div>
			<LazyProductRemarks v-if="page.labels" :data="page.labels" />
			<LazyProductDownloads v-if="page.downloads" :data="page.downloads" />
		</ContentLayoutSimple>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
