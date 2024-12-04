<template>
    <div class="app-backdrop">
        <div class="app-backdrop__logo">
            <IconLogo />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    args: {
        type: Boolean,
        default: true,
    },
});
</script>