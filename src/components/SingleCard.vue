<template>
  <div class="card">
      <div class="card__wrapper">
        <div class="card__content" @click.stop="openCard">
          <div class="card__content__upper">
            <div class="card__content__wrap-t">
              <CardStatus v-if="card.status" :card="card" />
              <span class="card__content__title search-word"
                :class="{ 'card__content__title--shirt': displayValue === 'none' }"
              >
                {{ card.title }}
              </span>
              <span class="card__content__number" v-if="card.number">
                {{ card.number }}
              </span>
            </div>
            <div class="card__content__utils">
              <CardPriority
                :priority="card.priority"
                class="card__content__utils__priority search-word"
              />
              <div
                v-if="card.status != 2"
                class="card__content__utils__comments"
                @click.stop="showComments()"
              >
                <img src="@/assets/icons/comments.svg" />
              </div>
              <div
                v-if="card.status != 2"
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
                    @click.stop="editCard(card)"
                  >
                    <img class="svg-icon" src="@/assets/icons/edit.svg" alt="">
                  </div>
                  <!-- <div
                    class="card__menu__link-content"
                    @click.stop="deleteCard(card.id)"
                  >
                    <img class="svg-icon" src="@/assets/icons/delete.svg" alt="">
                  </div> -->
                  <div
                    class="card__menu__link-content"
                    @click.stop="ChangeCard(card.id)"
                  >
                    <img
                      class="svg-icon"
                      src="@/assets/icons/done.svg"
                      alt="Добавить"
                    >
                  </div>
                </div>
              </div>
              <div class="card__content__chevron">
                <div
                  v-if="card.subordinates.length"
                  @click.stop="toogleChildCards"
                  class="card__content__chevron__content"
                >
                  <img
                    class="svg-icon"
                    src="@/assets/icons/down.svg"
                    alt=""
                    :style="{  transform: menuChevronTwo }"
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="card__content__lower" :style="{ display: displayValue }">
            <div class="card__content__description search-word">
              {{ card.description }}
            </div>
            <div class="card__content__lower__blocks">
              <div class="card__content__lower__left">
                <div class="card__content__label-info">
                  <span>Начало:</span>
                  <span class="search-word">{{ card.date }}</span>
                </div>
                <div class="card__content__label-info">
                  <span>Окончание:</span>
                  <span class="search-word">{{ card.endDate }}</span>
                </div>
              </div>
              <div
                v-if="card.tags.length || card.posts.length"
                class="card__content__lower__right"
              >
                <CardTags title="Тэги" :tags="card.tags"/>
                <CardTags title="Люди" :tags="card.posts"/>
              </div>
            </div>
            <!-- <CardComments :card="card" :cardComments="card.comments" /> -->
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
import CardStatus from "@/components/Card/CardStatus.vue"
import CardTags from "@/components/Card/CardTags.vue"
import CardPriority from "@/components/Card/CardPriority.vue"
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";
import { ref, computed } from "vue";

const cardsStore = useCards();
const { setSelectedCard, changeCardStatus, setEditedCard, setCommentsForCard } = cardsStore;

const props = defineProps(['card']);

const displayValue = ref('none');

const openCard = () => {
  if (displayValue.value == 'none') {
    displayValue.value = 'flex';
  } else {
    displayValue.value = 'none';
  }
}

const cardCom = computed(() => {
  return cardsStore.commentsForCard;
})

const showComments = () => {
  if (!cardCom.value) {
    setCommentsForCard(props.card);
  } else if (cardCom.value.id == props.card.id) {
    setCommentsForCard(null);
  } else if (cardCom.value.id != props.card.id) {
    setCommentsForCard(props.card);
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

const setChildCard = (id) => {
  setSelectedCard(id);
  toggle();
};

const editCard = (card) => {
  setEditedCard(card);
  toggle();
};

// const deleteCard = (id) => {
//   console.log(id);
// };

const ChangeCard = (id) => {
  changeCardStatus(id);
};
</script>

<style lang="scss" scoped>
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
    
    @media (max-width: 1024px) {
      width: 33%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

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
    background: $white;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.08);

    &__wrap-t {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 70%;
      
      @media (max-width: 1024px) {
        width: 100%;
        justify-content: space-between;
        gap: 10px;
      }
    }

    &__upper {
      border-radius: 10px;
      padding: 0 20px;
      cursor: pointer;
      min-height: 52px;
      gap: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 1024px) {
        flex-direction: column;
        padding: 0 20px;
        gap: 10px;
      }
    }

    &__description {
      word-break: break-all;
      padding: 20px;
      border-top: 1px solid $line;
      border-bottom: 1px solid $line;
    }

    &__lower {
      padding-top: 10px;
      min-height: 30px;
      flex-direction: column;

      &__left {
        min-width: 220px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px 20px;

        @media (max-width: 1024px) {
          width: 100%;
        }
      }

      &__right {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px 20px;
        border-left: 1px solid $line;

        @media (max-width: 1024px) {
          width: 100%;
          border: none;
        }
      }

      &__blocks {
        padding: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        @media (max-width: 1024px) {
          flex-direction: column;
        }
      }
    }

    &__label-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      color: $third-color;
      font-weight: 600;
    }

    &__status {
      padding-right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid $line;
      height: 100%;
      margin-right: 20px;

      @media (max-width: 1024px) {
        margin-right: 0;
        padding: 0;
        border: none;
      }
    }

    &__title {
      display: flex;
      align-items: center;
      width: 100%;
      font-size: 18px;
      color: $third-color;
      font-weight: 600;
      word-break: break-all;
      gap: 10px;

      // @media (min-width: 1024px) {
      //   margin: 10px 0;
      //   overflow: hidden;
      //   display: -webkit-box;
      //   -webkit-line-clamp: 1;
      //   -webkit-box-orient: vertical;
      // }

      &--shirt {
        margin: 10px 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }

    &__number {
      font-size: 10px;
      color: $white;
      background: #ffa500;
      padding: 2px;
      border-radius: 2px;
    }

    &__utils {
      max-width: 250px;
      width: 250px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 20px;

      &__priority {
        @media (max-width: 1024px) {
          width: 33%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      &__comments {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        min-width: 60px;
        height: 40px;
        font-size: 20px;
        background: $accent;
        color: #ffffff;
        transition: 0.3s;
        border-radius: 8px;

        &:hover {
          background: $accent-hover;
        }

        img {
          width: 24px;
          height: 24px;
        }
      }
      
      @media (max-width: 1024px) {
        justify-content: space-between;
        max-width: 100%;
        width: 100%;
      }
    }

    &__chevron {
      @media (max-width: 1024px) {
        width: 33%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }

      &__content {
        width: 44px;
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