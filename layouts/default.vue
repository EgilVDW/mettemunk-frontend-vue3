<template>
  <div id="app">
    <Loader :is-hidden="isHidden" />
    <HeaderLayout v-if="data && data.header" :data="data.header" />
    <NuxtPage />
    <FooterLayout
      v-if="data && data.footer && data.header"
      :data="data.footer"
      :logo="data.header.logo"
    />
  </div>
</template>
<script setup lang="ts">
import type { ICmsFooter, ICmsHeader } from "~/interfaces/cms/cmsPages";
import type { IFooter, IGsap, IHeader } from "~/interfaces/global";
import * as mapper from "~/utils/mapper";
// eslint-disable-next-line import/order
import * as cmsHelper from "../resources/datoCmsHelper";
import { gsap } from "gsap";

const isHidden = ref(false);

const mapHeader = async (cmsHeader: ICmsHeader): Promise<IHeader> => {
  return {
    logo: cmsHeader.logo != null ? mapper.mapImage(cmsHeader.logo) : null,
    menu: await Promise.all(
      cmsHeader.menu.map(
        async (item) => await mapper.mapParentChildrenLinkCollection(item)
      )
    ),
  };
};

const mapFooter = async (cmsFooter: ICmsFooter): Promise<IFooter> => {
  return {
    column1: cmsFooter.column1,
    column2: await Promise.all(
      cmsFooter.column2.map(async (x) => await mapper.mapLinkCollection(x))
    ),
    column3: await Promise.all(
      cmsFooter.column3.map(async (x) => await mapper.mapLinkCollection(x))
    ),
  };
};

const { data, error } = await useAsyncData("layout", async () => {
  const cmsHeader = await cmsHelper.GetHeader();
  const cmsFooter = await cmsHelper.GetFooter();


  return {
    header: await mapHeader(cmsHeader),
    footer: await mapFooter(cmsFooter),
  };
});

if (error.value) {
  console.error(error.value);
}

const gsapOnLoadHandler = (target: HTMLDivElement) => {
  const initState = () => {
    gsap.set(target, {
      opacity: 1,
      autoAlpha: 1,
    });
  };
  const toState = () => {
    gsap.to(target, {
      opacity: 0,
      duration: 0.5,
      ease: "power2",
      autoAlpha: 0,
      delay: 1.5,
    });
  };
  return { initState, toState };
};

onMounted(() => {
  isHidden.value = true;
})
</script>
<style >
.nuxt-icon {
  display: block;
}
.nuxt-icon svg{
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.35s cubic-bezier(0.77, 0, 0.175, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
