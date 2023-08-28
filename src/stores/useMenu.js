import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore('menu', () => {
  const isOpen = ref(false);

  const toggle = () => (isOpen.value = !isOpen.value);

  return { isOpen, toggle };
});
