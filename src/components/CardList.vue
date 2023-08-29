<template>
  <div class="cards__wrapper">
    В работе
    <SingleCard 
      v-for="card in sortedArray" 
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard.vue'
import { computed } from "vue";
import { useMenu } from "@/stores/useMenu";

const menuStore = useMenu();
const { sort } = menuStore;

const getSort = computed(() => {
  console.log(sort);
  return sort;
});

console.log(sort);

const props = defineProps(['cards']);

const sortedArray = computed(() => {
  return [...props.cards].sort((card1, card2) => (card1[getSort] > card2[getSort]) ? 1 : -1);
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