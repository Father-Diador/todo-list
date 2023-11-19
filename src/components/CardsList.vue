<template>
  <div class="cards">
    <span class="cards__title">В работе</span>
    <SingleCard 
      v-for="card in allCards" 
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard.vue'
import { useCards } from "@/stores/useCards";
import { useMenu } from "@/stores/useMenu";
import { storeToRefs } from "pinia";
import { computed } from 'vue';

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);

const menuStore = useMenu();
const { sort } = storeToRefs(menuStore);

const allCards = computed(() => {
  return cards.value.reduce((list, current) => {
    if (current.status === 1) {
      list.push(current)
    }
    let i = [...list].sort((list1, list2) => (list1[sort.value] > list2[sort.value]) ? 1 : -1);
    return i;
  }, []);
});
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  margin: 30px 0;

  &__title {
    font-size: 24px;
    font-weight: 500;
  }
}
</style>