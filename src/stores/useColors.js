import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useColors = defineStore('useColors', () => {

  const colors = ref(0);

  const setColors = (value) => {
    colors.value = value;
  };

  const getColors = () => {
    return colors.value;
  };

  return { getColors, setColors, colors };
});