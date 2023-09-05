import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore('menu', () => {

  const isOpen = ref(false);
  const toggle = () => (isOpen.value = !isOpen.value);

  const sort = ref('title');

  const setSort = (value) => {
    sort.value = value;
  };

  return { isOpen, toggle, sort, setSort };
});
