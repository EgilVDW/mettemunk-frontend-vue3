<template>
    <div class="app-backdrop">
        <div class="app-backdrop__logo">
            <IconLogo />
        </div>
    </div>
</template>

<script setup lang="ts">
import IconLogo from "~/assets/icons/icon-logo-border.svg";

defineProps({
    args: {
        type: Boolean,
        default: true,
    },
});
</script>