<template>
  <div class="main-wrp">
    <SideBar v-if="!disablePage" />
    <div class="wrapper">
      <Header v-if="!disablePage" />
      <router-view></router-view>
    </div>
    <CardForm v-if="isOpen && !disablePage" />
    <DashBoard v-if="!disablePage" />
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
import DashBoard from '@/components/DashBoard.vue'
import CardForm from '@/components/CardCreateForm/App.vue'
import { computed, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "@/stores/useMenu";
import { useLocalCards } from "@/stores/useLocalCards";
import { useRoute } from "vue-router";

const route = useRoute();
const disablePage = computed(() => {
  if (route.name == 'signin') {
    return true;
  } else {
    return false;
  }
});

const cardsStore = useLocalCards();
const { selectedOptions, localCards, setCardFromStorage, setOptionFromStorage } = cardsStore;
const cardPush = (value) => { setCardFromStorage(value) };
const optionsPush = (value) => { setOptionFromStorage(value) };

const menuStore = useMenu();
const { isOpen } = storeToRefs(menuStore);

onBeforeMount(() => {
  if (!JSON.parse(localStorage.getItem('LocalCards'))) {
    localStorage.setItem("LocalCards", JSON.stringify(localCards));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  } else {
    cardPush(JSON.parse(localStorage.getItem('LocalCards')));
    optionsPush(JSON.parse(localStorage.getItem('selectedOptions')))
    
  }
});
</script>

<style lang="scss" scoped>
.main-wrp {
  display: flex;
  flex-direction: row;
  gap: 25px;
  background-image: url(/public/background-white.jpeg);

  @media (max-width: 1024px) {
    gap: 0;
  }
}
</style>