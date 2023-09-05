<template>
  <div class="cards__wrapper">
    В работе:
    <SingleCard 
      v-for="card in sortedArray" 
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

const getSort = computed(() => {
  console.log(sort);
  return sort;
});

const sortedArray = computed(() => {
  return [...cards.value].sort((card1, card2) => (card1['priority'] > card2['priority']) ? 1 : -1);
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