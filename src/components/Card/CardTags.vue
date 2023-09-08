<template>
    <div class="tags">
        <div
            v-for="tag in tags"
            :key="tag"
            class="tags__content"
            :style="{ background: tag.color }"
            @click.stop="search(tag.title)"
        >
            {{ tag.title }}
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['tags'])

const search = (tag)  => {
    console.log(tag);
};
</script>

<style lang="scss" scoped>
.tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;

    &__content {
        cursor: pointer;
        padding: 5px 10px;
        background: $accent;
        color: $white;
        text-transform: uppercase;
        border-radius: 5px;
    }
}
</style>