import { useMediaQuery } from "@vueuse/core"
export const useMediaQueryCustom = () => {

    const isMobile = useMediaQuery('(max-width: 540px)')

    const isLargeScreen = useMediaQuery('(min-width: 922px)')
    
    const isClient = ref(false);
    
    onMounted(() => {
        isClient.value = true
    })

    return {
        isMobile,
        isLargeScreen,
        isClient,
    }
}
