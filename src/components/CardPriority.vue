<template>
    <div class="priority">
        <div
            v-if="priority === '1'"
            class="priority__wrapper"
        >
            <div class="priority__marker priority__red"></div>
            <span>Высокий</span>
        </div>
        <div
            v-if="priority === '2'"
            class="priority__wrapper"
        >
            <div class="priority__marker priority__orange"></div>
            <span>Срочный</span>
        </div>
        <div
            v-if="priority === '3'"
            class="priority__wrapper"
        >
            <div class="priority__marker priority__blue"></div>
            <span>Нормальный</span>
        </div>
        <div
            v-if="priority === '4'"
            class="priority__wrapper"
        >
            <div class="priority__marker priority__green"></div>
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

    &__marker {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    &__red {
        background: #FF4242;
    }

    &__orange {
        background: #FF8900;
    }

    &__green {
        background: #5DE1C4;
    }

    &__blue {
        background: #2962E8;
    }


}
</style>