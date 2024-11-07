<template>
	<main>
		<BannerSimple :page="page" />
		<ContentLayout>
			<template #breadcrumbs>
				<Breadcrumbs :data="breadcrumbs" :is-dark="true" />
			</template>
			<ModularContent v-if="page.modularContent" :data="page.modularContent" />
		</ContentLayout>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
