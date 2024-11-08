import type { IFrontPage } from "~/interfaces/pages";

export default defineNuxtComponent({
    setup() {
        const props = defineProps({
            page: {
                type: Object as PropType<IFrontPage>,
                default: null,
            }
        })

        useHead(() => {
            return generateHead(useRoute().path, props.page);
        })
    }
})
