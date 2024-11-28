<template>
	<div class="product-slider col-lg-7">
		<div class="product-slider__image-section c-mb-l">
			<Hooper group="group1">
				<Slide v-for="(item, index) in data" :key="index" class="product-slider__image">
					<DatocmsImage v-if="item.responsiveImage" :data="item.responsiveImage" />

					<!-- Rerender video component to reset video when sliding on/off -->
					<LazyMuxVideo
						v-else-if="item.video && index === currentSlide"
						:video-item="item.video"
						:autoplay="false"
					/>
				</Slide>
			</Hooper>
		</div>

		<div class="product-slider__thumb-section">
			<Hooper ref="hooperNavigation" group="group1" :items-to-show="4" @slide="setCurrentSlide">
					<Slide  v-for="(item, index) in data" :key="index" class="product-slider__thumb-image">
						<!-- Image thumbnail -->
						<button v-if="item.responsiveImage" @click="setSlide(index)">
							<DatocmsImage v-if="item.responsiveImage" class="product-slider__thumb-wrapper" :data="item.responsiveImage" />
						</button>

						<!-- Video thumbnail -->
						<button v-else-if="item.video" class="product-slider__thumb-wrapper" @click="setSlide(index)">
							<img :src="item.video.thumbnailUrl" />
							<div class="product-slider__thumb-video">
								<!-- <svg-icon name="icon-play"></svg-icon> -->
							</div>
						</button>
					</Slide>

				<HooperPagination slot="hooper-addons" class="product-slider__pagination flex-center-center" />
				<HooperNavigation slot="hooper-addons" class="product-slider__navigation">
					<nuxt-icon slot="hooper-prev" class="product-slider__navigation-arrow" name="icon-arrow" />
					<nuxt-icon slot="hooper-next" class="product-slider__navigation-arrow" name="icon-arrow" />
				</HooperNavigation>
			</Hooper>
		</div>
	</div>
</template>
<script setup lang="ts">
import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from '@wattanx/hooper-vue3';
import '@wattanx/hooper-vue3/css';
import type { IImage } from "~/interfaces/ui";

defineProps({
	data: {
		type: Array as PropType<IImage[]>,
		default: null,
	}
});

const currentSlide = ref(0);
const hooperNavigation = ref();

const setSlide = (id: number) => {
	hooperNavigation.value.slideTo(id);
};

const setCurrentSlide = (e: { currentSlide: number }) => {
	currentSlide.value = e.currentSlide;
}
</script>
<style lang="scss" src="./productSlider.scss"></style>
