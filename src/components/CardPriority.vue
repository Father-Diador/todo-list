<template>
    <div class="priority">
        <div
            v-if="priority === '1'"
            class="priority__marker priority__red"
        ></div>
        <div
            v-if="priority === '2'"
            class="priority__marker priority__yellow"
        ></div>
        <div
            v-if="priority === '3'"
            class="priority__marker priority__green"
        ></div>
    </div>
</template>

<script>
export default {
    props: {
        priority: {
            type: String,
        }
    }
}
</script>

<style scoped lang="scss">
.priority {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    &__marker {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    &__red {
        background: #ff7a66;
    }

    &__yellow {
        background: #faf87d;
    }

    &__green {
        background: #0fff83;
    }


}
</style>