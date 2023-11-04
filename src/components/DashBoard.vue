<template>
    <div
        class="dashboard__wrapper"
        :style="{ width: dashBoard + 'px' }"
    >
        <div class="btn-default" @click="del">
            <span class="btn-default__plus">
                <img src="@/assets/icons/delete-cards.svg" alt="">
            </span>
        </div>
        <div v-if="dashBoard > 100" class="dashboard__comments">
            <CardComments v-if="card" :card="card" :cardComments="card.comments" />
        </div>
        <div class="dashboard__wrapper__rights">ver. 0.2</div>
    </div>
</template>

<script setup>
import CardComments from "@/components/Card/CardComments.vue"
import { computed, ref, watch } from "vue";
import { useCards } from "@/stores/useCards";
import { storeToRefs } from "pinia";

const menuStore = useCards();
const { commentsForCard } = storeToRefs(menuStore);

const dashBoard = ref(100);

const card = computed(() => {
    return commentsForCard.value;
})

watch(card, () => {
    if (commentsForCard.value != null) {
        dashBoard.value = 500;
    } else {
        dashBoard.value = 100;
    }
})

const del = () => {
    localStorage.clear();
}
</script>

<style lang="scss" scoped>
.dashboard {
    &__comments {
        width: 100%;
    }
    &__wrapper {
        box-sizing: border-box;
        height: 100vh;
        padding: 20px;
        background: $white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        transition: 0.1s;
        gap: 20px;

        -webkit-box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);
        box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);

        &__rights {
            position: absolute;
            bottom: 20px;
            text-align: right;
        }
    }
}
</style>