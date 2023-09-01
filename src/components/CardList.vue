<template>
  <div class="cards__wrapper">
    В работе
    <SingleCard 
      v-for="card in cards" 
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard.vue'
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const menuStore = useMenu();
const { sort } = storeToRefs(menuStore);

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);

console.log(cards);

const getSort = computed(() => {
  return sort;
});

const sortedArray = computed(() => {
  return [...cards].sort((card1, card2) => (card1[getSort()] > card2[getSort()]) ? 1 : -1);
});
</script>

<style lang="scss" scoped>
.cards__wrapper{
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;
}
</style>