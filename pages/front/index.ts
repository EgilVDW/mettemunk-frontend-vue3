export default defineNuxtComponent({
    setup() {
        defineProps({
            page: {
                type: Object as PropType<IFrontPage>,
                default: null,
            }
        })

        useHead(() => {
            return generateHead(useRoute().path, this.page);
        })
    }
})
