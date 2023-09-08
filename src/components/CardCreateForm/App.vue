<template>
  <div @click.stop="toggleMenu" class="form__overlay">
    <div
      @click.stop
      class="form"
    >
      <span @click="toggleMenu" class="form__cancel-btn">×</span>
      <div class="form__title">
        <h4>Создать карточку</h4>   
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
          v-model="card.endDate"
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
      <div class="form__tags">
        <div class="form__tags__block">
          <div class="form__tags__checkbox">
            <input type="checkbox" v-model="tags">
            <span>Добавить тэг</span>
          </div>
          <div class="form__input-pos" v-if="tags">
            <div class="form__add-tags">
              <input 
                name="tags" 
                type="text" 
                v-model="tag.title"
                placeholder="Добавьте тэг"
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
        </div>
        <div class="form__tags__block">
          <div class="form__tags__checkbox">
            <input type="checkbox" v-model="posts">
            <span>Добавить человека</span>
          </div>
          <div class="form__input-pos" v-if="posts">
            <div class="form__add-tags">
              <input 
                name="tags" 
                type="text" 
                v-model="post.title"
                placeholder="Добавьте должность"
                class="form__add-tags__input"
              >
              <button
                class="form__add-tags__btn"
                @click="addPost"
              >+</button>
            </div>
            <div class="form__add-tags__tags">
              <span
                v-for="post in card.posts"
                :key="post"
                class="form__add-tags__tag"
              >
                {{ post.title }}
              </span>
            </div>
          </div>
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
  posts: [],
  date: '',
  endDate: '',
});

const tags = ref(false);
const tagTitle = ref();
const tag = reactive({
  id: '',
  title: '',
  color: '#ffb899',
});

const posts = ref(false);
const postTitle = ref();
const post = reactive({
  id: '',
  title: '',
  color: '#00db6a',
});

const addCard = () => {
  if (card.title !== '' && card.description !== '') {

    card.id = Date.now();

    // получение текущей даты
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    today = year + '-' + month + '-' + day;
    card.date = today;

    // автозаполнение приоритета
    if (card.priority == '') {
      card.priority = '4';
    }

    // if (!card.tags.length) {
    //   card.tags.push({title: 'Тэги не выбраны', value: 0});
    // }

    // автозаполнение даты окончания
    if (!card.endDate.length) {
      card.endDate = 'Не выбрано';
    }

    // пуш в массив с карточками
    cardPush(card);
    
    // очистка полей
    card = {};
    toggleMenu();
  } else {
     alert('Ошибка! Поля не заполнены!')
  }
};

// добавление тега
const addTag = () => {
  tag.id = Date.now();
  card.tags.push(JSON.parse(JSON.stringify(tag)));
  tag.title =  '';
};

// добавление должности
const addPost = () => {
  post.id = Date.now();
  card.posts.push(JSON.parse(JSON.stringify(post)));
  post.title =  '';
};
</script>

<style lang="scss" scoped>
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
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 0; }

  &__tags {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;

    &__checkbox {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;

      input {
        width: 15px;
        height: 15px;
      }
    }
  }

  &__add-tags {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    gap: 20px;

    &__input {
      width: 100%;
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
      font-size: 20px;

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