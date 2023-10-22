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
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const menuStore = useMenu();
const { sort } = storeToRefs(menuStore);

const stat = ref(1);

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);

const allCards = cards.value.reduce((list, current) => {
  if (current.status === 1) {
    list.push(current)
  }
  return list
}, []);


// const getSort = computed(() => {
//   console.log(sort);
//   return sort;
// });

// const sortedArray = computed(() => {
//   return [...cards.value].sort((card1, card2) => (card1['priority'] > card2['priority']) ? 1 : -1);
// });
</script>

<style lang="scss" scoped>
.cards{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  margin-top: 30px;

  &__title {
    font-size: 24px;
    font-weight: 500;
  }
}
</style>