<template>
    <div class="wrapper">
        <SideBar />
        <CardForm v-if="isOpen" />
        <CardList />
        <DashBoard />
    </div>
</template>

<script setup>
import { useCards } from "@/stores/useCards";
const cardsStore = useCards();
const { selectedOptions, cards, setCardFromStorage, setOptionFromStorage } = cardsStore;
const cardPush = (value) => { setCardFromStorage(value) };
const optionsPush = (value) => { setOptionFromStorage(value) };


import CardForm from '@/components/CardCreateForm/App.vue'
import CardList from '@/components/CardList.vue'
import SideBar from '@/components/SideBar.vue'
import DashBoard from '@/components/DashBoard.vue'
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "@/stores/useMenu";

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
  
<style lang="scss" scoped>
.wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}
</style>