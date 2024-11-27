<template>
  <header
    v-if="data"
    :class="[
      styleBackground,
      { 'is-scrolling': activeBackground },
      { 'is-active': openMenu },
    ]"
    class="header flex flex-vertical-center"
  >
    <div class="main-grid header__wrapper">
      <div class="flex-space-between">
        <!-- Logo -->
        <div class="flex-vertical-center">
          <nuxt-link to="/" class="header__logo-link flex flex-vertical-center">
            <nuxt-icon name="icon-logo" class="header__logo logo" filled />
          </nuxt-link>
        </div>

        <div class="flex flex-vertical-center flex-end">
          <!-- Language selector -->
          <div
            class="header__language-selector"
            :class="{ 'is-active': languageDropdown }"
          >
            <button
              class="header__current-language flex flex-vertical-center"
              @click="setLanguageDropdown"
            >
              <span>
                {{ siteLang === "da" ? "DK" : "EN" }}
              </span>
              
              <nuxt-icon name="icon-dropdown" class="header__language-selector icon" filled />
            </button>

            <div class="header__language-dropdown">
              <a v-if="siteLang === 'da'" :href="englishBaseUrl">EN</a>
              <a v-else :href="danishBaseUrl">DK</a>
            </div>
          </div>
          <!-- Menu button -->
          <button
            class="header__menu flex-center-center"
            :class="{ 'is-active': openMenu }"
            @click="setMenu"
          >
            <div class="header__menu-text flex-center-center">
              <span class="text-highlighted"> MENU </span>
            </div>
            <div class="header__menu-close flex-center-center">
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <HeaderMenu
      v-if="data.menu"
      :class="{ 'is-active': openMenu }"
      :data="data.menu"
      @close-menu="setMenu"
    />
  </header>
</template>
<script setup lang="ts">
import type { IHeader } from "~/interfaces/global";

defineProps({
  data: {
    type: Object as PropType<IHeader>,
    required: true,
  },
});

const config = useRuntimeConfig();
const router = useRouter();
const styleBackground = ref("");
const activeBackground = ref(false);
const languageDropdown = ref(false);
const openMenu = ref(false);
const siteLang = ref(config.public.CULTURE);
const danishBaseUrl = ref(config.public.DANISH_BASEURL);
const englishBaseUrl = ref(config.public.ENGLISH_BASEURL);
const closeDropdownsVal = useState("closeDropdownsVal", () => false);

onMounted(() => {
  setMenuTheme();
  onScroll();
});

const setMenuTheme = () => {
  setTimeout(() => {
    // All dark themed pages has a banner and light theme has none
    const el = document.querySelector(".banner") as HTMLElement;
    if (el) {
      styleBackground.value = "is-dark-theme";
      const isArticlePage = document.querySelector(
        ".grid-wrapper--light "
      ) as HTMLElement;
      if (isArticlePage) {
        styleBackground.value = "is-light-theme";
      }
    } else {
      activeBackground.value = true;
      styleBackground.value = "is-light-theme";
    }
  }, 500);
};

const onScroll = () => {
  // Set active background when scrolling
  window.addEventListener("scroll", () => {
    // If menu is active, dont apply the active background color
    const menu = document.querySelector(".header"); // ???
    if (menu && !menu.className.includes("is-active")) {
      if (styleBackground.value === "is-light-theme") {
        window.scrollY < 5
          ? (activeBackground.value = false)
          : (activeBackground.value = true);
      } else {
        window.scrollY < 200
          ? (activeBackground.value = false)
          : (activeBackground.value = true);
      }
    }
  });
};

onUnmounted(() => {
  onScroll();
});

const setMenu = () => {
    if(openMenu.value) {
      closeDropdownsVal.value = true;
    }

  openMenu.value = !openMenu.value;
};

const setLanguageDropdown = () => {
  languageDropdown.value = !languageDropdown.value;
};

watch(router.currentRoute, () => {
  setMenuTheme();
  openMenu.value = false;

  // nuxt global emitter research
  closeDropdownsVal.value = true;

});
</script>
<style lang="scss" src="./headerLayout.scss"></style>
