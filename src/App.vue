<template>
  <div class="main-wrp" v-if="jwt || disablePage">
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
import { computed, onBeforeMount, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "@/stores/useMenu";
import { useLocalCards } from "@/stores/useLocalCards";
import { useJwt } from "@/stores/useJwt";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const disablePage = computed(() => {
  if (route.name == 'signin') {
    return true;
  } else {
    return false;
  }
});

const menuStore = useMenu();
const { isOpen } = storeToRefs(menuStore);

const cardsStore = useLocalCards();
const { selectedOptions, localCards, setCardFromStorage, setOptionFromStorage } = cardsStore;

const useJwtStore = useJwt()
const { setJwt } = useJwtStore;

const { jwt } = storeToRefs(useJwtStore);

// const pageLoader = computed(() => {
//   console.log(getJwt());
//   return getJwt();
// });

const cardPush = (value) => { setCardFromStorage(value) };
const optionsPush = (value) => { setOptionFromStorage(value) };

const cookies = reactive({});

const jwtParser = () => {
  cookies.atmo_access = document.cookie.split(";").filter((item) => item.includes("atmo_jwt_access"))[0].slice(16);
  cookies.atmo_refresh = document.cookie.split(";").filter((item) => item.includes("atmo_jwt_refresh"))[0].slice(18);
  cookies.atmo_name = document.cookie.split(";").filter((item) => item.includes("atmo_name"))[0].slice(11);
  setJwt(cookies);
};

if (!document.cookie) {
    router.push('/');
} else {
  jwtParser();
}

const localStorageItems = () => {
  if (!JSON.parse(localStorage.getItem('LocalCards'))) {
    localStorage.setItem("LocalCards", JSON.stringify(localCards));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  } else {
    cardPush(JSON.parse(localStorage.getItem('LocalCards')));
    optionsPush(JSON.parse(localStorage.getItem('selectedOptions')))
  }
};

onBeforeMount(() => {
  localStorageItems();
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