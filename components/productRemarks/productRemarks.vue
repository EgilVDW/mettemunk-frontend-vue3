<template>
	<div class="row">
		<div id="remarks" class="remarks offset-lg-2 col-lg-7 l-mb-l">
			<ul v-if="dictionary" class="reset-ul">
				<!-- Dictionary -->
				<li class="remarks__item c-mb-l c-pb-xl">
					<h2 class="h3 remarks__headline c-mt-reset c-mb-l">{{ dictionary.labelsTitle }}</h2>
					<div v-html="dictionary.labelsSubtitle"></div>
				</li>
				<li
					v-for="(item, index) in data"
					:key="item.title + ' ' + index"
					class="remarks__item remarks__item--with-icon c-mb-l c-pb-xl"
				>
					<h3 v-if="item.title" class="h5 remarks__headline">
						{{ item.title }}
					</h3>
					<CustomStructuredText v-if="item.content" :content="item.content" :unique-key="id" />
					<div class="remarks__icon">
						<img v-if="item.icon && item.icon.url" :src="item.icon.url" alt />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useGetDictionary } from "~/composable/useGetDictionary";
import type { ICmsDictionary } from "~/interfaces/cms/cmsBase";
import type { ILabel } from "~/interfaces/pages";
const {getDictionaries} = useGetDictionary() 


const {data: dictionary} = await useAsyncData("dictionary", async () => {
	const d = getDictionaries()
	if(d) {
		return d;
	} 
	return null;

})


defineProps({
	data: {
		type: Array as PropType<ILabel[]>,
		default: null,
	},
	id: {
		type: String,
		required: true
	}
});
</script>
<style lang="scss" src="./productRemarks.scss"></style>
