<template>
	<div class="contact-list">
		<div class="row">
			<h2 v-if="data.name" class="h3 col-12 c-mt-reset c-mb-ml">{{ data.name }}</h2>
		</div>
		<ul v-if="data.employees" class="reset-ul row">
			<ContactItem
				v-for="(contact, index) in data.employees"
				:key="index"
				:data="contact"
				class="col-lg-3 col-md-4 col-12"
			/>
		</ul>
	</div>
</template>
<script setup lang="ts">
import type { IDepartment } from "~/interfaces/blocks";

defineProps({
	data: {
		type: Object as PropType<IDepartment>
	}
})
</script>
<style lang="scss" src="./contactList.scss"></style>
