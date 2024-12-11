<template>
    <div class="app-backdrop" :class="{'is-hidden': isHidden}">
        <div class="app-backdrop__logo">
            <nuxt-icon name="icon-logo-border" filled/>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps({
    args: {
        type: Boolean,
        default: true,
    },
    isHidden: {
        type: Boolean,
        default: true,
    }
});
</script>