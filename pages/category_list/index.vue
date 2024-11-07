<template>
	<main v-if="page">
		<BannerSimple :page="page" />
		<ContentLayout>
			<template #breadcrumbs>
				<Breadcrumbs :data="breadcrumbs" :is-dark="true" />
			</template>
			<CardListBlock :data="page.items" :not-modular="true" />
		</ContentLayout>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
