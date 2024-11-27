<template>
	<div>
		<datocms-structured-text
        :data="data"
        :render-inline-record="renderInlineRecord"
        :render-link-to-record="renderLinkToRecord"
    	/>
	</div>
</template>
<script setup lang="ts">
import * as mapper from "~/utils/mapper";

const props = defineProps({
	content: {
		type: Object,
		required: true,
	},
	uniqueKey: {
		type: String,
		required: true,
	},
});



        const { data } = await useAsyncData(props.uniqueKey, async () => {
            if (props.content.links && props.content.links.length > 0) {
                const links = props.content?.links.map(async (link: any) => {
                    const newSlug = await mapper.getUrl(link.id);
                    return {
                        ...link,
                        slug: newSlug,
                    };
                });
                const resolvedLinks = await Promise.all(links);
                return {
                    value: props.content.value,
                    links: resolvedLinks,
                };
            } else {
                return {
                    value: props.content.value,
                    links: [],
                };
            }
        });

        const renderInlineRecord = ({ record }: { record: { slug: string; headline: string } }) => {
            const link = resolveComponent("NuxtLink");
            return h(link, { to: `${record.slug}` }, { default: record.headline });
        };

        const renderLinkToRecord = ({
            record,
            children,
        }: {
            record: { slug: string; headline: string };
            children: string[];
        }) => {
            const link = resolveComponent("NuxtLink");
            const extraOptions: { target?: string } = {};


            return h(link, { to: `${record.slug}`, ...extraOptions }, { default: children });
        };
</script>
