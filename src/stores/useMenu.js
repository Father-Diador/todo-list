import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMenu = defineStore('menu', () => {

  const isOpen = ref(false);
  const toggle = () => (isOpen.value = !isOpen.value);

  const sideBar = ref(100);
  const sidebarOpacity = ref(0);

  const toogleSidebar = () => {
    if (!sidebarOpacity.value) {
        sideBar.value = 300;
        sidebarOpacity.value = 1;

    } else {
        sideBar.value = 100;
        sidebarOpacity.value = 0;
    }
};

  return { isOpen, toggle, sideBar, sidebarOpacity, toogleSidebar };
});
