<template>
    <div class="card__content__status">
        {{ cardStatus }}
    </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(['card']);

const cardStatus = computed(() => {
    if (props.card.status === 1) {
        return 'Создано';
    } else if (props.card.status === 2) {
        return 'В ожидании';
    } else if (props.card.status === 3) {
        return 'Подтверждение';
    } else if (props.card.status === 4) {
        return 'В работе';
    } else if (props.card.status === 5) {
        return 'Выполнено';
    } else {
        return 'Закрыто';
    } 
});
</script>

<style lang="scss" scoped>
</style>