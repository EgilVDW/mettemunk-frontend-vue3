<template>
  <footer v-if="data" class="footer l-pt-l l-pb-s">
    <div class="main-grid">
      <div class="row">
        <div class="col">
          <nuxt-icon name="icon-logo" class="footer__logo logo l-mb-m" filled />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-2">
          <datocms-structured-text :data="data.column1" />
        </div>
        <div class="col-lg-2">
          <ul
            v-for="menu in data.column2"
            :key="menu.title"
            class="reset-ul c-mb-ml"
          >
            <li class="footer__headline h5 h5--light">{{ menu.title }}</li>
            <li
              v-for="item in menu.links"
              :key="item.text"
              class="footer__item"
            >
              <NavigationLink
                class="c-mb-reset"
                :link="item.url"
                :text="item.text"
                :icon="true"
                :internal="item.internal"
              />
            </li>
          </ul>
        </div>
        <div class="col-lg-2">
          <ul
            v-for="menu in data.column3"
            :key="menu.title"
            class="reset-ul c-mb-ml"
          >
            <li class="footer__headline h5 h5--light">{{ menu.title }}</li>
            <li
              v-for="item in menu.links"
              :key="item.text"
              class="footer__item"
            >
              <NavigationLink
                class="c-mb-reset"
                :link="item.url"
                :text="item.text"
                :under-line="true"
                :internal="item.internal"
              />
            </li>
          </ul>
        </div>
        <div class="col flex-end--desktop">
          <Newsletter v-if="siteLang === 'da'" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="seperator-line l-my-s" />
        </div>
        <div class="col-12">
          <div class="flex-space-between flex-vertical-center">
            <div>
              <a
                v-if="dictionary && dictionary.socialMediaLinkedin"
                class="footer__some-link flex-center-center"
                :href="dictionary.socialMediaLinkedin"
                target="_blank"
              >
                <nuxt-icon name="icon-linkedin" class="footer__some-icon" filled />
              </a>
            </div>
            <div class="flex-vertical-center">
              <span
                v-if="dictionary && dictionary.generalCompanyName"
                class="c-mr-l footer__seal-text text-default"
              >
                {{ dictionary.generalCompanyName }}
              </span>
              <nuxt-icon name="icon-seal" class="footer__seal-icon" filled />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useGetDictionary } from "~/composable/useGetDictionary";
import type { IFooter } from "~/interfaces/global";
import type { IImage } from "~/interfaces/ui";

defineProps({
  data: {
    type: Object as PropType<IFooter>,
    required: true,
  },
  logo: {
    type: Object as PropType<IImage>,
    required: true,
  },
});

const config = useRuntimeConfig();
const siteLang = ref(config.public.CULTURE);
const { getDictionaries } = useGetDictionary();

const { data: dictionary } = await useAsyncData("dictionary", async () => {
  const fetchDictionary = await getDictionaries();
  return {
    ...fetchDictionary,
  };
});
</script>
<style lang="scss" src="./footerLayout.scss"></style>
