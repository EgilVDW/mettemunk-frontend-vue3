<template>
  <div>
  <PagesFront
      v-if="data.page && data.page.type == 'front'"
      :page="data.page"
    />
    <PagesContact v-if="data.page && data.page.type == 'contact'" :page="data.page" :breadcrumbs="data.breadcrumbs" /> 
		<PagesArticle v-if="data.page && data.page.type == 'article'" :page="data.page" :breadcrumbs="data.breadcrumbs" />
		<PagesCategory v-if="data.page && data.page.type == 'category'" :page="data.page" :breadcrumbs="data.breadcrumbs" />
		<PagesProduct v-if="data.page && data.page.type == 'product'" :page="data.page" :breadcrumbs="data.breadcrumbs" />
		<PagesLanding v-if="data.page && data.page.type == 'landing'" :page="data.page" :breadcrumbs="data.breadcrumbs" />
		<PagesCategoryList v-if="data.page && data.page.type == 'category_list'" :page="data.page" :breadcrumbs="data.breadcrumbs" />
  </div>
</template>
<script src="./index.page.ts" lang="ts"></script>
