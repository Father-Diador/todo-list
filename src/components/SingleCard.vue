<template>
  <div class="card">
      <div class="card__wrapper">
        <div class="card__content" @click.stop="openCard">
          <div class="card__content__upper">
            <CardStatus v-if="card.status" :card="card" />
            <span class="card__content__title">{{ card.title }}</span>
            <div class="card__content__utils">
              <CardPriority :priority="card.priority" />
              <div
                class="card__menu"
                @mouseover.stop="toggleCardMenu"
                @mouseout.stop="toggleCardMenu"
                @click.stop
              >
                <div
                  class="card__menu__add-btn"
                  :style="{ borderRadius:menuRadius }"
                >
                  <img class="svg-icon" src="@/assets/icons/settings.svg" alt="" :style="{  transform: menuChevron }">
                </div>
                <div class="card__menu__link" :style="{ display: menu }">
                  <div
                    class="card__menu__link-content"
                    @click.stop="setChildCard(card.id)"
                  >
                    <img class="svg-icon" src="@/assets/icons/add.svg" alt="">
                  </div>
                  <div
                    class="card__menu__link-content"
                    @click.stop="editCard(card.id)"
                  >
                    <img class="svg-icon" src="@/assets/icons/edit.svg" alt="">
                  </div>
                  <div
                    class="card__menu__link-content"
                    @click.stop="deleteCard(card.id)"
                  >
                    <img class="svg-icon" src="@/assets/icons/delete.svg" alt="">
                  </div>
                  <div
                    class="card__menu__link-content"
                    @click.stop="cardStatus"
                  >
                    <img
                      class="svg-icon"
                      src="@/assets/icons/done.svg"
                      alt="Добавить"
                    >
                  </div>
                </div>
              </div>
              <div
                v-if="card.subordinates.length"
                @click.stop="toogleChildCards"
                class="card__content__chevron"
              >
                <img class="svg-icon" src="@/assets/icons/down.svg" alt="" :style="{  transform: menuChevronTwo }">
              </div>
            </div>
          </div>
          <div class="card__content__lower" :style="{ display: displayValue }">
            <div class="card__content__lower__left">
              <div class="card__content__label-info">
                <span>Начало:</span>
                <span>{{ card.date }}</span>
              </div>
              <div class="card__content__label-info">
                <span>Окончание:</span>
                <span>{{ card.endDate }}</span>
              </div>
            </div>
            <div class="card__content__lower__right">
              <span
                v-for="tag in card.tags"
                :key="tag"
              >
                <span
                  v-if="tag.value === 0"
                  class="card__content__empty-tag"
                >
                  {{ tag.title }}
                </span>
                <span
                  class="card__content__tag"
                  v-else
                >
                  {{ tag.title }}
                </span>
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
import Icon from "@/components/shared/SvgIcon.vue"
import CardStatus from "@/components/CardStatus.vue"
import CardPriority from "@/components/CardPriority.vue"
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";
import { ref } from "vue";

const props = defineProps(['card']);

const displayValue = ref('none');

const openCard = () => {
  if (displayValue.value == 'none') {
    displayValue.value = 'flex';
  } else {
    displayValue.value = 'none';
  }
}

const isVissible = ref(false);
const menuChevronTwo = ref('rotate(0)');

const toogleChildCards = () => {
  isVissible.value = !isVissible.value;
  if(isVissible.value) {
    menuChevronTwo.value = 'rotate(180deg)';
  } else {
    menuChevronTwo.value = 'rotate(0)';
  }
}

const menuStore = useMenu();
const { toggle } = menuStore;

const cardsStore = useCards();
const { setSelectedCard } = cardsStore;

const menu = ref('none');
const menuRadius = ref('7px');
const menuChevron = ref('rotate(0)');

const toggleCardMenu = () => {
  if (menu.value === 'none') {
    menu.value = 'flex';
    menuRadius.value = '7px 7px 0 0';
    menuChevron.value = 'rotate(180deg)';
  } else {
    menu.value = 'none';
    menuRadius.value = '7px';
    menuChevron.value= 'rotate(0)';
  }
};

const cardStatus = () => {
  if (card.status === 1) {
    card.status = 2;
  } else {
    card.status = 1;
  }
};

const setChildCard = (id) => {
  setSelectedCard(id);
  toggle();
};

const editCard = (id) => {
  console.log(id);
};

const deleteCard = (id) => {
  console.log(id);
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

  &__menu {
      position: relative;

      &__add-btn {
        cursor: pointer;
        width: 60px;
        height: 40px;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: $accent;
        color: $white;
        transition: 0.3s;

        &:hover {
          background: $accent-hover;
        }
      }

      &__link {
        z-index: 9;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40px;
        left: 0;

        cursor: pointer;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 7px 7px;
        overflow: hidden;

        &-content {
          width: 60px;
          height: 40px;
          font-size: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: $light-gray;
          transition: 0.3s;

          &:hover {
            background: #89a8f0;
          }
        }
      }
  }

  &__content {
    cursor: pointer;
    background: $white;
    width: 100%;
    gap: 10px;
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
      // padding-bottom: 15px;
    }

    &__lower {
      border-top: 1px solid $line;
      padding-top: 10px;
      min-height: 30px;
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

    &__empty-tag {
      padding: 5px 10px;
      background: $light-gray;
      color: $gray;
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

    &__status {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid $line;
      height: 100%;
    }

    &__title {
      width: 55%;
      font-size: 18px;
      color: $third-color;
      font-weight: 600;
      line-height: 30px;
      word-break: break-all;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    &__utils {
      max-width: 30%;
      width: 30%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;
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