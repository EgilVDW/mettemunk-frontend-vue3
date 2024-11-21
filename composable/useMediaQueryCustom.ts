import { useMediaQuery } from "@vueuse/core"
export const useMediaQueryCustom = () => {

    const isLargeScreen = ref(false);

    onMounted(() => {
        if(window.innerWidth > 922) {
            isLargeScreen.value = true;
        }
    })
    

    return {
        isLargeScreen,
    }
}