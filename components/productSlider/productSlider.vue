<template>
  <div class="product-slider col-lg-7">
    <div class="product-slider__image-section c-mb-l">
      <Hooper ref="mainHooperSlider" group="group1">
        <Slide
          v-for="(item, index) in data"
          :key="index"
          class="product-slider__image"
        >
          <DatocmsImage
            v-if="item.responsiveImage"
            :data="item.responsiveImage"
            layout="responsive"
          />

          <!-- Rerender video component to reset video when sliding on/off -->
          <LazyMuxVideo
            v-else-if="item.video && index === currentSlide"
            :video-item="item.video"
            :autoplay="false"
          />
        </Slide>
        <template #hooper-addons>
          <HooperPagination />
        </template>
      </Hooper>
    </div>

    <div class="product-slider__thumb-section">
      <button @click="prevSlide" class="product-slider__prev-button">
        <nuxt-icon class="product-slider__navigation-arrow" name="icon-arrow" />
      </button>
      <Hooper
        ref="hooperNavigation"
        group="group1"
        :items-to-show="4"
        @slide="setCurrentSlide"
      >
        <Slide
          v-for="(item, index) in data"
          :key="index"
          class="product-slider__thumb-image"
        >
          <!-- Image thumbnail -->
          <button
            class="product-slider__thumb-wrapper"
            v-if="item.responsiveImage"
            @click="setSlide(index)"
          >
            <DatocmsImage
              v-if="item.responsiveImage"
              layout="responsive"
              :data="item.responsiveImage"
            />
          </button>

          <!-- Video thumbnail -->
          <button
            v-else-if="item.video"
            class="product-slider__thumb-wrapper"
            @click="setSlide(index)"
          >
            <img :src="item.video.thumbnailUrl" />
            <div class="product-slider__thumb-video">
              <!-- <svg-icon name="icon-play"></svg-icon> -->
            </div>
          </button>
        </Slide>
        <HooperPagination
          slot="hooper-addons"
          class="product-slider__pagination flex-center-center"
        />
      </Hooper>

      <button @click="nextSlide" class="product-slider__next-button">
        <nuxt-icon class="product-slider__navigation-arrow" name="icon-arrow" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Hooper,
  Slide,
  Navigation,
  Pagination as HooperPagination,
} from "@wattanx/hooper-vue3";
import "@wattanx/hooper-vue3/css";
import type { IImage } from "~/interfaces/ui";

defineProps({
  data: {
    type: Array as PropType<IImage[]>,
    default: null,
  },
});

const currentSlide = ref(0);
const hooperNavigation = ref();
const mainHooperSlider = ref();

const setSlide = (id: number) => {
  hooperNavigation.value.slideTo(id);
  mainHooperSlider.value.slideTo(id);
};

const nextSlide = (id: number) => {
  if (
    hooperNavigation.value.currentSlide <
    hooperNavigation.value.slidesCount - 1
  ) {
    mainHooperSlider.value.slideTo(hooperNavigation.value.currentSlide + 1);
    hooperNavigation.value.slideTo(hooperNavigation.value.currentSlide + 1);
  }
  // mainHooperSlider.value.slideTo(hooperNavigation.value.data.currentSlide	+ 1);
};

const prevSlide = (id: number) => {
  if (hooperNavigation.value.currentSlide > 0) {
    mainHooperSlider.value.slideTo(hooperNavigation.value.currentSlide - 1);
    hooperNavigation.value.slideTo(hooperNavigation.value.currentSlide - 1);
  }
  // mainHooperSlider.value.slideTo(hooperNavigation.value.data.currentSlide	+ 1);
};

const setCurrentSlide = (e: { currentSlide: number }) => {
  currentSlide.value = e.currentSlide;
};
</script>
<style lang="scss" src="./productSlider.scss"></style>
