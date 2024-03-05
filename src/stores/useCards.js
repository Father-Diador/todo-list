import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCards = defineStore('useCards', () => {

  const allCards = ref([]);

  const setCards = (value) => {
    allCards.value = value;
  };

  return { useCards, allCards, setCards };
});