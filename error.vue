<template>
	<main v-if="data">
        <HeaderLayout v-if="data && data.header" :data="data.header" />

		<ContentLayoutSimple>
			<h1>{{ data?.errorData.title }}</h1>
			<CustomStructuredText :content="data?.errorData.content" :unique-key="'error-page'"/>
		</ContentLayoutSimple>
        <FooterLayout
      v-if="data && data.footer && data.header"
      :data="data.footer"
      :logo="data.header.logo"
    />
	</main>
</template>
<script setup lang="ts">
import * as cmsHelper from '~/resources/datoCmsHelper';
import { ICmsHeader, ICmsFooter } from './interfaces/cms/cmsPages';
import { IHeader, IFooter } from './interfaces/global';
import * as mapper from "~/utils/mapper";



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

const { data, error } = await useAsyncData("errorPage", async () => {
  const cmsHeader = await cmsHelper.GetHeader();
  const cmsFooter = await cmsHelper.GetFooter();
  const errorData = await cmsHelper.GetNotFoundPage();


  return {
    header: await mapHeader(cmsHeader),
    footer: await mapFooter(cmsFooter),
    errorData,
  };
});



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
</style>
