<template>
  <div @click.stop="toggleMenu" class="form__overlay">
    <div
      @click.stop
      class="form"
    >
      <span @click="toggleMenu" class="form__cancel-btn">×</span>
      <div class="form__title">
        <h4>Добавить карточку</h4>   
      </div>

      <div class="form__input-pos">
        <label
          class="form__input-pos__label"
          for="title"
        >
          Название
        </label>
        <input 
          name="title" 
          type="text"
          v-model="card.title"
          placeholder="Введите название"
          class="form__input-pos__input"
        >
      </div>

      <div class="form__input-pos">
        <label
          class="form__input-pos__label"
          for="description"
        >
          Описание
        </label>
        <input 
          name="description" 
          type="text" 
          v-model="card.description"
          placeholder="Добавьте описание"
          class="form__input-pos__input"
        >
      </div>

      <div class="form__input-pos">
        <label
          class="form__input-pos__label"
          for="end"
        >
          Окончание
        </label>
        <input 
          name="end" 
          type="date" 
          v-model="card.end_date"
          placeholder="Добавьте описание"
          class="form__input-pos__input"
        >
      </div>

      <div class="form__input-pos">
        <label class="form__input-pos__label" for="">
          Приоритет
        </label>
        <select
          v-model="card.priority"
          class="form__input-pos__input"
        >
          <option value="">Выберите</option>
          <option value="1">Срочный</option>
          <option value="2">Высокий</option>
          <option value="3">Нормальный</option>
          <option value="4">Низкий</option>
      </select>
      </div>

      <div class="form__input-pos">
        <label
          class="form__input-pos__label"
          for="tags"
        >
          Тэги
        </label>
        <div class="form__add-tags">
          <input 
            name="tags" 
            type="text" 
            v-model="tagTitle"
            placeholder="Добавьте описание"
            class="form__add-tags__input"
          >
          <button
            class="form__add-tags__btn"
            @click="addTag"
          >+</button>
        </div>
        <div class="form__add-tags__tags">
            <span
              v-for="tag in card.tags"
              :key="tag"
              class="form__add-tags__tag"
            >
              {{ tag.title }}
            </span>
          </div>
      </div>
      
      <span class="btn-default" @click="addCard">Создать</span>

    </div>
  </div>
</template>

<script setup>
import { useMenu } from "@/stores/useMenu";
import { useCards } from "@/stores/useCards";
import { reactive, ref } from "vue";

//стор на открытие меню
const menuStore = useMenu();
const { toggle } = menuStore;
const toggleMenu = () => { toggle() };

//стор на создание карт
const cardsStore = useCards();
const { setCard } = cardsStore;
const cardPush = (value) => { setCard(value) };

let card = reactive({
  priority: '',
  title: '',
  description: '',
  selectedCard: '',
  subordinates: [],
  tags: [],
  date: '',
});

const tagTitle = ref();

const tag = reactive({
  id: '',
  title: '',
});

const addCard = () => {
  if (card.title !== '' && card.description !== '') {

    card.id = Date.now();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = mm + '.' + dd + '.' + yyyy;
    card.date = today;

    if (card.priority == '') {
      card.priority = '4';
    }
    cardPush(card);

    card = {};
    toggleMenu();
  } else {
     alert('Ошибка! Поля не заполнены!')
  }
};

const addTag = () => {
  console.log(tagTitle.value);
  tag.id = Date.now();
  tag.title = tagTitle.value;
  card.tags.push(tag);
  console.log(card);
  tagTitle.value = null;
};
</script>

<style scoped lang="scss">
.form{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 40px 20px;
  border-radius: 10px;
  background: $white;
  gap: 30px;

  &__add-tags {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    gap: 20px;

    &__input {
      width: 30%;
      padding: 15px 10px;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      outline: none;
      box-sizing: border-box;
    }

    &__btn {
      cursor: pointer;
      border-radius: 10px;
      padding: 10px 20px;
      border: none;
      background: $accent;
      color: $white;

      &:hover {
        background: $accent-hover;
      }
    }

    &__tags {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }

    &__tag {
      padding: 5px 10px;
      background: $light-gray;
      color: $gray;
      text-transform: uppercase;
      border-radius: 5px;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: $bg-header-transparent;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__cancel-btn {
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $accent;
    color: $white;
    font-size: 20px;
    line-height: 20px;
    position: absolute;
    top: 10px;
    left: 10px;

    &:hover {
      background: $accent-hover;
    }
  }

  &__input-pos {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;

    &__input {
      width: 100%;
      padding: 15px 10px;
      border: 1px solid #dbdbdb;
      border-radius: 10px;
      outline: none;
      box-sizing: border-box;
    }
    &__label {
      width: 100%;
      margin-left: 5px;
    }
  }
}
</style>