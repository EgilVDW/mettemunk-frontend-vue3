<template>
	<div id="main" class="grid-wrapper">
		<div v-if="$slots['breadcrumb']" class="main-grid">
			<slot name="breadcrumb" />
		</div>
		<div class="main-grid l-pt-m l-pb-xxl">
			<slot></slot>
		</div>
	</div>
</template>
<style scoped lang="scss" src="./contentLayoutSimple.scss"></style>
