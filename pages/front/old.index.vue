<template>
	<main v-if="page">
		<Banner :page="page" :italic="true" />
		<ContentLayout>
			<ModularContent v-if="page.modularContent" :data="page.modularContent" />
		</ContentLayout>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
