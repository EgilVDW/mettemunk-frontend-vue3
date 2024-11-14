<template>
  <div class="banner flex-vertical-end banner--full-height">
    <div class="banner__image-wrapper">
      <MuxVideo
        v-if="page.bannerVideo"
        :video-item="page.bannerVideo"
        class="banner__video"
      />
      <DatocmsImage
        v-else-if="page.bannerImage.responsiveImage"
        class="banner__image"
        :data="page.bannerImage.responsiveImage"
      />
    </div>
    <div class="main-grid banner__content-wrapper">
      <div class="row">
        <div class="banner__content col-md-5 col-12">
          <h1 class="banner__headline c-mb-m c-mt-reset">
            {{ page.bannerTitle }}
          </h1>
          <p
            class="text-teaser text-teaser--light c-mb-reset c-mt-reset"
            :class="{ 'text-teaser--italic': italic }"
          >
            {{ page.bannerSubTitle }}
          </p>
        </div>
      </div>

      <!-- Only fullheight banner has this row -->
      <div class="row c-mt-xl">
        <div class="banner__bottom-content flex col-12">
          <BaseLink
            v-if="page.bannerLink"
            class="base-link--primary"
            :link="page.bannerLink"
          />
          <button
            v-if="isLargeScreen"
            class="banner__anchor-wrapper"
            @click="scrollToSection"
          >
            <svg-icon class="banner__anchor" name="icon-arrow-long" />
          </button>
          <button
            v-else
            class="banner__anchor-wrapper banner__anchor-wrapper--mobile"
            @click="scrollToSection"
          >
            <svg-icon class="banner__anchor" name="icon-arrow-light-vertical" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import type { ICmsBannerPage } from "~/interfaces/cms/cmsPages";

const isLargeScreen = useMediaQuery("(min-width: 768px)");

defineProps({
  page: {
    type: Object as PropType<ICmsBannerPage>,
    required: true,
  },
  fullHeight: {
    type: Boolean,
    default: false,
  },
  italic: {
    type: Boolean,
    default: false,
  },
});

const scrollToSection = () => {
  const el = document.querySelector("#main");
  if (el) {
    // @ts-ignore
    const offset = isLargeScreen ? 130 : 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = el.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>
<style lang="scss" src="./banner.scss"></style>
