<template>
    <div class="card__content__status">
        <template v-if="card.status === 1">
            <img v-if="!card" class="status-icon" src="@/assets/icons/status-flash.svg" alt="">
            <img v-if="card" class="status-icon" src="@/assets/icons/status-proccess.svg" alt="">
        </template>
        <img v-if="card.status === 2" class="status-icon" src="@/assets/icons/status-done.svg" alt="">
    </div>
</template>

<script setup>
import { onBeforeMount } from "vue";

const props = defineProps(['card']);

onBeforeMount(() => {
    if (props.card.endDate) {
        console.log(props.card.endDate);
    }
});
</script>

<style lang="scss" scoped>
.status-icon {
    width: 40px;
    height: 40px;
}
</style>