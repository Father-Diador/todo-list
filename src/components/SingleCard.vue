<template>
  <div class="card" @click.stop="openCard">
      <div class="card__wrapper">
        <div class="card__content card-small">
          <div class="card__content__upper">
            <span class="card__content__title">{{ card.title }}</span>
            <div class="card__content__utils">
              <CardPriority :priority="card.priority" />
              <div class="card__content__add-btn" @click.stop="setChildCard(card.id)">+</div>
              <div
                v-if="card.subordinates.length"
                @click.stop="isVissible = !isVissible"
                class="card__content__chevron"
              >▼</div>
            </div>
          </div>
          <div class="card__content__lower">
            <div class="card__content__lower__left">
              <div class="card__content__label-info">
                <span>Начало:</span>
                <span>{{ card.date }}</span>
              </div>
              <div class="card__content__label-info">
                <span>Окончание:</span>
                <span>{{ card.end_date }}</span>
              </div>
            </div>
            <div class="card__content__lower__right">
              <span
                v-for="tag in card.tags"
                :key="tag"
                class="card__content__tag"
              >
                {{ tag.title }}
              </span>
            </div>
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

// const heightValue = ref(false);

// const openCard = () => {
//   let elem = document.querySelector('#card');
//   if (heightValue.value === false) {
//     elem.classList.remove("card-small");
//     console.log(1);
//   } else {
//     elem.classList.add("card-small");
//     console.log(2);
//   }
//   heightValue.value = !heightValue.value;
// };

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
    overflow: hidden;
    cursor: pointer;
    background: $white;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.08);

    &__upper {
      min-height: 52px;
      gap: 2.5px;
      width: 100%;
      // min-height: 30px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid $line;
    }

    &__lower {
      padding-top: 10px;
      min-height: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 20px;

      &__left {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px 20px 10px 0;
        border-right: 1px solid $line;
      }

      &__right {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 10px;
      }
    }

    &__tag {
      padding: 5px 10px;
      background: $accent;
      color: $white;
      text-transform: uppercase;
      border-radius: 5px;
    }

    &__label-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      color: $third-color;
      font-weight: 600;
      // font-size: 14px;
    }

    &__title {
      width: 65%;
      font-size: 15px;
      color: $third-color;
      font-weight: 600;
      line-height: 30px;
    }

    // &__date {
    //   width: 20%;
    //   line-height: 30px;
    // }

    &__utils {
      max-width: 30%;
      width: 30%;
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

// .card-small {
//   height: 52px;
//   overflow: hidden;
// }
</style>