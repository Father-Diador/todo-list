<template>
    <div class="card__content__status">
        {{ cardStatus }}
    </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(['card']);

const cardStatus = computed(() => {
    if (props.card.status === 5) {
        return 'Создано';
    } else if (props.card.status === 6) {
        return 'В ожидании';
    } else if (props.card.status === 9) {
        return 'Подтверждение';
    } else if (props.card.status === 7) {
        return 'В работе';
    } else if (props.card.status === 25) {
        return 'Выполнено';
    } else if (props.card.status === 26) {
        return 'Закрыто';
    } 
});
</script>