<template>
  <div>
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <CardForm v-if="isOpen" />
    <SideBar />
    <DashBoard />
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import DashBoard from '@/components/DashBoard.vue'
import CardForm from '@/components/CardCreateForm/App.vue'
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";

const cardsStore = useCards();
const { selectedOptions, cards, setCardFromStorage, setOptionFromStorage } = cardsStore;
const cardPush = (value) => { setCardFromStorage(value) };
const optionsPush = (value) => { setOptionFromStorage(value) };

const menuStore = useMenu();
const { isOpen } = storeToRefs(menuStore);

onBeforeMount(() => {
  if (!JSON.parse(localStorage.getItem('allCards'))) {
    localStorage.setItem("allCards", JSON.stringify(cards));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  } else {
    cardPush(JSON.parse(localStorage.getItem('allCards')));
    optionsPush(JSON.parse(localStorage.getItem('selectedOptions')))
    
  }
});
</script>

<style lang="scss" scoped></style>