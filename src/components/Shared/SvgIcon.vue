<template>
    <svg :class="className" aria-hidden="true">
        <use :xlink:href="symbolId" :fill="color" />
    </svg>
</template>

<script settup>
import { computed, defineProps } from 'vue';

const props = defineProps({
    name: String,
});

const symbolId = computed(() => `#${props.name}`);
const className = computed(() => 'svg-icon svg-icon' + props.name);
</script>