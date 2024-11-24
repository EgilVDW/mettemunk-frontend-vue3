<template>
	<div class="l-mb-l">
		<ul class="row reset-ul article-list">
			<li v-for="item in data" :key="item.link.text" class="card-article col-lg-4 col-md-6 col-12">
				<div class="card-article__wrapper flex">
					<NuxtLink v-if="item.link" :to="item.link.url" class="card-article__link">
						<DatocmsImage
							v-if="item.image"
							class="card-article__image"
							:data="item.image.responsiveImage"
						/>
						<div class="flex flex-vertical-center">
							<p
								v-if="item.link.text"
								class="card-article__text text-highlighted text-highlighted--light c-my-reset text-uppercase"
							>
								{{ item.link.text }}
							</p>
							<nuxt-icon name="icon-arrow" class="c-ml-s" />
						</div>
					</NuxtLink>
					<br />
				</div>
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import type { ICardArticleBlock } from "~/interfaces/blocks";

defineProps({
	data: {
		type: Array as PropType<ICardArticleBlock[]>,
		default: null,
	}
});
</script>
<style lang="scss" src="./cardArticleListBlock.scss"></style>
