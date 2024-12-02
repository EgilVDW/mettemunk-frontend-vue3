import { useMediaQuery } from "@vueuse/core"
export const useMediaQueryCustom = () => {

    const isLargeScreen = useMediaQuery('(min-width: 922px)')
    
    return {
        isLargeScreen,
    }
}
