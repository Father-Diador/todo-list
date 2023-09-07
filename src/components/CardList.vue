<template>
  <div class="cards">
    <div class="cards__upper">
      <span class="cards__title">В работе</span>
      <SingleCard 
        v-for="card in sortedArray" 
        :key="card.id"
        :card="card"
      />
    </div>
    <div class="cards__lower">
      <span class="cards__title">Готовые</span>
      <SingleCard 
        v-for="card in sortedArray" 
        :key="card.id"
        :card="card"
      />
    </div>
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
.cards{
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 20px;
  gap: 40px;
  align-items: flex-start;

  &__title {
    font-size: 20px;
    font-weight: 600;
  }

  &__upper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
  }

  &__lower {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
  }
}
</style>