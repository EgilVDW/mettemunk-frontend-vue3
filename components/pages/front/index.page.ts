import type { IFrontPage } from "~/interfaces/pages";

export default defineNuxtComponent({
  setup() {
    const { path } = useRoute();
    const props = defineProps({
      page: {
        type: Object as PropType<IFrontPage>,
        default: null,
      },
    });

    useHead(() => {
      // return generateHead(path, props.page);
    });

    return {
      page,
    };
  },
});
