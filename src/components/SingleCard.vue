<template>
  <div class="card">
      <div class="card__wrapper">
        <div class="card__content">
          <p>{{ card.title }}</p>
          <p>{{ card.description }}</p>
          <p>{{ card.date }}</p>

          <div class="card__content__priority">
            <CardPriority :priority="card.priority" />
            <div class="card__content__add-btn" @click="setChildCard(card.id)">+</div>
            <div
              v-if="card.subordinates.length"
              @click.stop="isVissible = !isVissible"
              class="card__content__chevron"
            >▼</div>
          </div>

        </div>
        <div v-if="isVissible" class="card__child">
          <SingleCard
            v-for="card in card.subordinates"
            :key="card.id"
            :card="card"
            class="card__child__card"
          />
        </div>
      </div>
  </div>
</template>

<script setup>
import CardPriority from "@/components/CardPriority.vue"
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";
import { ref } from "vue";

const isVissible = ref(false);
const props = defineProps(['card']);

const menuStore = useMenu();
const { toggle } = menuStore;

const cardsStore = useCards();
const { setSelectedCard } = cardsStore;

const setChildCard = (value) => {
  setSelectedCard(value);
  toggle();
  };
</script>

<style scoped lang="scss">
*{
  box-sizing: border-box;
}
.card{
  display: flex;
  flex-direction: column;
  width: 100%;

  &__wrapper {
    background: $light-gray;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 10px;
  }

  &__content {
    height: 52px;
    background: $white;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    -webkit-box-shadow: 0px 4px 18px -7px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 4px 18px -7px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 4px 18px -7px rgba(34, 60, 80, 0.2);

    &__priority {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
    }

    &__add-btn {
      cursor: pointer;
      width: 60px;
      height: 30px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
      background: $accent;
      color: $white;

      &:hover {
        background: $accent-hover;
      }
    }

    &__chevron {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 50%;
      background: $bg;
      font-size: 18px;
    }
  }

  &__btn {
    display: flex;
    justify-content: end;
    width: 50px;
  }

  &__child {
    margin: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    &__card{
      margin-left: 20px;
      width: calc(100% - 20px);
      border-radius: 10px;
    }
  }

  &__child-card {
    .card__content{
      width: calc(100% - 20px);
    }
  }
}
</style>