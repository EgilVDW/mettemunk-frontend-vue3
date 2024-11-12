<template>
	<main v-if="page">
		<ContentLayoutSimple>
			<template #breadcrumb>
				<Breadcrumbs :data="breadcrumbs" />
			</template>
			<ContactIntro v-if="page.showTop" :data="page" />

			<ContactList
				v-for="(department, index) in page.departments"
				:key="department.name + index"
				:data="department"
			/>
		</ContentLayoutSimple>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
