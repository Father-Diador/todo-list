<template>
    <div class="priority">
        <div
            v-if="priority === '1'"
            class="priority__wrapper"
        >
            <div class="priority-marker priority-marker__danger">
                <img src="@/assets/icons/danger.svg" alt="">
            </div>
            <span>Срочный</span>
        </div>
        <div
            v-if="priority === '2'"
            class="priority__wrapper"
        >
            <div class="priority-marker priority-marker__red"></div>
            <span>Высокий</span>
        </div>
        <div
            v-if="priority === '3'"
            class="priority__wrapper"
        >
            <div class="priority-marker priority-marker__blue"></div>
            <span>Нормальный</span>
        </div>
        <div
            v-if="priority === '4'"
            class="priority__wrapper"
        >
            <div class="priority-marker priority-marker__green"></div>
            <span>Низкий</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['priority']);
</script>

<style scoped lang="scss">
.priority {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;

    &__wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;

        span {
            font-size: 16px;
            font-weight: 600;
            color: $main-color;
        }
    }
}
</style>