<template>
  <div class="cards">
    <span class="cards__title">Локальные</span>
    <Loader />
    <SingleCard 
      v-for="card in sortedLocalCards" 
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard.vue'
import Loader from "@/components/Loader.vue";
import { useLocalCards } from "@/stores/useLocalCards";
import { storeToRefs } from "pinia";
import { computed } from 'vue';

const cardsStore = useLocalCards();
const { localCards } = storeToRefs(cardsStore);

const sortedLocalCards = computed(() => {
  return localCards.value.reduce(() => {
    let i = [...localCards.value].sort((list1, list2) => (list1.status > list2.status) ? 1 : -1);
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