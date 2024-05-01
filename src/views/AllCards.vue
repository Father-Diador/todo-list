<template>
  <div class="cards">
    <span class="cards__title">В работе</span>
    <Loader class="cards__loader" v-if="loader" />
    <SingleCard 
      v-for="card in cards" 
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script setup>
import SingleCard from '@/components/SingleCard.vue'
import { storeToRefs } from "pinia";
import http from '@/js/http';
import { computed, onBeforeMount, ref } from 'vue';
import { useCards } from "@/stores/useCards";
import { useJwt } from "@/stores/useJwt";
import Loader from "@/components/Loader.vue";

const useJwtStore = useJwt()
const { getJwt } = useJwtStore;

const jwt = getJwt();

const loader = ref(true);

const allCardsStore = useCards();
const { allCards } = storeToRefs(allCardsStore);
const { setCards } = allCardsStore;

const cards = computed(() => {
  return allCards.value;
});

// watch(jwt, () => {
//   http.getCards(jwt.atmo_access, (res) => {
//     setCards(res);
//   });
// });

onBeforeMount(() => {
  http.getCards(jwt.atmo_access, (res) => {
    setCards(res);
    loader.value = false;
  });
});

</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
  margin: 30px 0;

  &__title {
    font-size: 24px;
    font-weight: 500;
  }

  &__loader {
    position: absolute;
    top: calc(50% - 24px);
    left: calc(50% - 24px);
  }
}
</style>