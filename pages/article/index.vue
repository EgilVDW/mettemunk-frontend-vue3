<template>
	<main v-if="page">
		<BannerSimple :page="page" />
		<ContentLayout :light-theme="true">
			<template #breadcrumbs>
				<div class="row">
					<div class="offset-lg-2 col-lg-7">
						<Breadcrumbs :data="breadcrumbs" :is-dark="false" />
					</div>
				</div>
			</template>

			<div class="row">
				<div class="col-lg-2">
					<div class="seperator-line seperator-line--light c-mt-m"></div>
				</div>
				<div class="col-xl-7 article-content">
					<h2>{{ page.title }}</h2>
					<ModularContent v-if="page.modularContent" :data="page.modularContent" :less-spacing="true" />
				</div>
			</div>
		</ContentLayout>
	</main>
</template>
<script src="./index.ts" lang="ts"></script>
<style src="./article-content.scss" lang="scss"></style>
