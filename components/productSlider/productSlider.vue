<template>
	<div class="product-slider col-lg-7">
		<div class="product-slider__image-section c-mb-l">
			<Hooper group="group1">
				<template v-for="(item, index) in data">
					<Slide v-if="item.responsiveImage || item.video" :key="index" class="product-slider__image">
						<DatocmsImage v-if="item.responsiveImage" :data="item.responsiveImage" />

						<!-- Rerender video component to reset video when sliding on/off -->
						<LazyMuxVideo
							v-else-if="item.video && index === currentSlide"
							:video-item="item.video"
							:autoplay="false"
						/>
					</Slide>
				</template>
			</Hooper>
		</div>

		<div class="product-slider__thumb-section">
			<Hooper ref="hooperNavigation" group="group1" :items-to-show="4" @slide="setCurrentSlide">
				<template v-for="(item, index) in data">
					<Slide v-if="item.responsiveImage || item.video" :key="index" class="product-slider__thumb-image">
						<!-- Image thumbnail -->
						<button v-if="item.responsiveImage" @click="setSlide(index)">
							<DatocmsImage class="product-slider__thumb-wrapper" :data="item.responsiveImage" />
						</button>

						<!-- Video thumbnail -->
						<button v-else-if="item.video" class="product-slider__thumb-wrapper" @click="setSlide(index)">
							<img :src="item.video.thumbnailUrl" />
							<div class="product-slider__thumb-video">
								<svg-icon name="icon-play"></svg-icon>
							</div>
						</button>
					</Slide>
				</template>

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
// import { Hooper, Slide, Navigation as HooperNavigation, Pagination as HooperPagination } from "hooper"; // ???
// import "hooper/dist/hooper.css"; // ???
import type { IImage } from "~/interfaces/ui";

defineProps({
	data: {
		type: Array as PropType<IImage[]>,
		default: null,
	}
});

const currentSlide = 0;

const setSlide = (id: number) => {
	// @ts-ignore
	this.$refs.hooperNavigation.slideTo(id);
};

const setCurrentSlide = (e: { currentSlide: number }) => {
	this.currentSlide = e.currentSlide;
}
</script>
<style lang="scss" src="./productSlider.scss"></style>
