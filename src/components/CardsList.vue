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
import { storeToRefs } from "pinia";

const cardsStore = useCards();
const { cards } = storeToRefs(cardsStore);

const allCards = cards.value.reduce((list, current) => {
  if (current.status === 1) {
    list.push(current)
  }
  return list
}, []);

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
    color: $third-color;
    font-size: 24px;
    font-weight: 500;
  }
}
</style>