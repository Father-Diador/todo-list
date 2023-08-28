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
        <label class="form__input-pos__label" for="">
          Приоритет
        </label>
        <select
          v-model="card.priority"
          class="form__input-pos__input"
        >
          <option value="">Выберите</option>
          <option value="1">Высокий</option>
          <option value="2">Средний</option>
          <option value="3">Низкий</option>
      </select>
      </div>

      <div v-if="selectOptions.length" class="form__input-pos">
        <label class="form__input-pos__label" for="">
          Привязка к карточке
        </label>
        <CardSelect 
          :selectOptions="selectOptions"
          v-model="card.selectedCard"
          class="form__input-pos__input"
        />
      </div>
      
      <span class="btn-default" @click="addCard">Создать</span>

    </div>
  </div>
</template>

<script setup>
import CardSelect from '@/components/CardCreateForm/CardSelect.vue'
import { useMenu } from "@/stores/useMenu";
import { reactive } from "vue";

const menuStore = useMenu();
const { toggle } = menuStore;
const toggleMenu = () => { toggle() };

let card = reactive({
  priority: '',
  title: '',
  description: '',
  selectedCard: '',
  subordinates: [],
  date: '',
});

const props = defineProps(['selectOptions']);
const emit = defineEmits(['create']);

console.log(props.selectOptions);

const addCard = () => {
  if (card.title !== '' && card.description !== '') {
    card.id = Date.now();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '.' + dd + '.' + yyyy;

    card.date = today;

    if (card.priority == '') {
      card.priority = '3';
    }
    emit('create', card)
    console.log(card);
    card = {};
    toggleMenu();
  } else {
     alert('Ошибка! Поля не заполнены!')
  }
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