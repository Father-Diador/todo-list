<template>
    <div class="cards">
      <span class="cards__title">Закрытые</span>
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
  import { computed } from "vue";
  
  const menuStore = useMenu();
  const { sort } = storeToRefs(menuStore);
  
  const cardsStore = useCards();
  const { cards } = storeToRefs(cardsStore);
  
  const allCards = computed(() => {
  return cards.value.reduce((list, current) => {
    if (current.status === 2) {
      list.push(current)
    }
    return list
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