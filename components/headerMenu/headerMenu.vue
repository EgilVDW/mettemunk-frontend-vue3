<template>
	<nav class="menu">
		<div class="menu__overlay" @click="closeMenu"></div>
		<div class="menu__section">
			<!-- Desktop  -->
			<div v-if="$mq !== 'mobile'" class="menu__links flex flex-wrap">
				<ul v-for="x in data" :key="x.title" class="menu__links-category c-pb-xl reset-ul">
					<!-- Category -->
					<li class="menu__primary-link h4">
						<NuxtLink v-if="x.link.internal" :to="x.link.url">{{ x.link.text }}</NuxtLink>
						<a v-else :href="x.link.url">{{ x.link.text }}</a>
					</li>

					<!-- Subcategory -->
					<li v-for="link in x.links" :key="link.text" class="menu__sub-link text-default c-mt-s">
						<NuxtLink v-if="link.internal" :to="link.url">{{ link.text }}</NuxtLink>
						<a v-else :href="link.url">{{ link.text }}</a>
					</li>
				</ul>
			</div>

			<!-- Mobile -->
			<div v-else class="menu-mobile main-grid">
				<ul
					v-for="(x, index) in data"
					:key="x.title"
					ref="dropdown"
					class="menu-mobile__category c-mt-l"
					:class="{ 'is-active': activeIndex === index }"
				>
					<!-- Category -->
					<li class="menu-mobile__primary flex flex-space-between flex-vertical-center">
						<NuxtLink v-if="x.link" :to="x.link.url" class="h3">{{ x.link.text }}</NuxtLink>
						<div
							class="menu-mobile__icon-wrapper flex flex-vertical-center flex-end"
							@click="setDropdown(index)"
						>
							<nuxt-icon name="icon-dropdown" class="menu-mobile__icon" />
						</div>
					</li>

					<!-- Dropdown - subcategories  -->
					<div class="menu-mobile__dropdown">
						<div class="menu-mobile__list">
							<li
								v-for="link in x.links"
								:key="link.text"
								class="menu-mobile__sub-link text-default c-mt-m"
							>
								<NuxtLink v-if="link.internal" :to="link.url">{{ link.text }}</NuxtLink>
								<a v-else :href="link.url">{{ link.text }}</a>
							</li>
						</div>
					</div>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script setup lang="ts">
import type { IParentChildrenLinkCollection } from "~/interfaces/blocks";

defineProps({
	 data: {
		type: Array as PropType<IParentChildrenLinkCollection[]>,
		default: null,
	},
});

	const activeIndex: number | null = null;
	const resetValue: string = "0px";

	onMounted(() =>{
		this.$root.$on("close-dropdowns", this.closeDropdowns);
	});

	const closeMenu = () => {
		this.$emit("close-menu");
	}

	const setDropdown = (index: number) => {
		const el = this.$refs.dropdown as HTMLElement[];
		const closeAllDropdowns = this.activeIndex === index;

		el?.forEach((item, i) => {
			const dropdown = item.querySelector(".menu-mobile__dropdown") as HTMLElement;
			if (index !== i || closeAllDropdowns) {
				dropdown.style.maxHeight = this.resetValue;
			} else {
				const childEl = dropdown.firstChild as HTMLElement;
				const height = childEl ? childEl.clientHeight : 250;
				dropdown.style.maxHeight = height + 12 + "px";
			}
		});

		this.activeIndex = closeAllDropdowns ? null : index;
	}

	const closeDropdowns = () => {
		const el = this.$refs.dropdown as HTMLElement[];
		el?.forEach((item) => {
			const dropdown = item.querySelector(".menu-mobile__dropdown") as HTMLElement;
			dropdown.style.maxHeight = this.resetValue;
		});

		this.activeIndex = null;
	};

</script>
<style lang="scss" src="./headerMenu.scss"></style>
