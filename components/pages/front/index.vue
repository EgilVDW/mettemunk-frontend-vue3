<template>
  <main>
    <Banner :page="page" :italic="true" />
    <ContentLayout>
      <ModularContent v-if="page.modularContent" :data="page.modularContent" />
    </ContentLayout>
  </main>
</template>
<script lang="ts" setup>
import type { IFrontPage } from "~/interfaces/pages";

const props = defineProps({
  page: {
    type: Object as PropType<IFrontPage>,
    default: null,
  },
});
</script>
