<template>
	<main v-if="page">
		<BannerSimple :page="page" />
		<ContentLayout>
			<template #breadcrumbs>
				<Breadcrumbs :data="breadcrumbs" :is-dark="true" />
			</template>

			<div>
				<CardListBlock :data="page.products" :not-modular="true" />
			</div>
		</ContentLayout>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
