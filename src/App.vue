<template>
  <div class="main-wrp">
    <SideBar v-if="sidebar" />
    <div class="wrapper">
      <Header v-if="header" />
      <router-view></router-view>
    </div>
    <CardForm v-if="isOpen" />
    <DashBoard v-if="dashboard" />
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
import { useCards } from "@/stores/useCards";
import { useRoute } from "vue-router";

const cardsStore = useCards();
const { selectedOptions, cards, setCardFromStorage, setOptionFromStorage } = cardsStore;
const cardPush = (value) => { setCardFromStorage(value) };
const optionsPush = (value) => { setOptionFromStorage(value) };

const menuStore = useMenu();
const { isOpen } = storeToRefs(menuStore);

const route = useRoute();

const sidebar = computed(() => {
  if (route.name == 'signin') {
    return false;
  }
  else {
    return true;
  }
});

const header = computed(() => {
  if (route.name == 'signin') {
    return false;
  }
  else {
    return true;
  }
});

const dashboard = computed(() => {
  if (route.name == 'signin') {
    return false;
  }
  else {
    return true;
  }
});

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
.main-wrp {
  display: flex;
  flex-direction: row;
  gap: 25px;
  background: url('/public/background-white.jpeg');
  background-size: cover;
}
</style>