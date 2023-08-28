<template>
  <div class="table-wrapper">
    <div class="table">
      <div class="btn-small" @click="sort('priority')">По приоритету</div>
      <div class="btn-small" @click="sort('date')">По дате</div>
    </div>

    <SingleCard 
      v-for="card in sortedArray" 
      :key="card.id"
      :card="card"
    />

  </div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard.vue'
import { ref, computed } from "vue";

const props = defineProps(['cards']);

const selectedSort = ref('title');

const sort = (value) => {
  selectedSort.value = value;
};

const sortedArray = computed(() => {
  return [...props.cards].sort((card1, card2) => (card1[selectedSort.value] > card2[selectedSort.value]) ? 1 : -1);
});
</script>

<style scoped>
.table-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;
}
.table{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
}
</style>