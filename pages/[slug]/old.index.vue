<template>
	<div>
		<FrontPage v-if="page && page.type == 'front'" :page="page" />
		<ContactPage v-if="page && page.type == 'contact'" :page="page" :breadcrumbs="breadcrumbs" />
		<ArticlePage v-if="page && page.type == 'article'" :page="page" :breadcrumbs="breadcrumbs" />
		<CategoryPage v-if="page && page.type == 'category'" :page="page" :breadcrumbs="breadcrumbs" />
		<ProductPage v-if="page && page.type == 'product'" :page="page" :breadcrumbs="breadcrumbs" />
		<LandingPage v-if="page && page.type == 'landing'" :page="page" :breadcrumbs="breadcrumbs" />
		<CategoryListPage v-if="page && page.type == 'category_list'" :page="page" :breadcrumbs="breadcrumbs" />
	</div>
</template>
<script src="./index.ts" lang="ts"></script>
