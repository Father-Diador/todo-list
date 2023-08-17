<template>
  <div @click.stop="closeForm" class="form__overlay">
    <div
      @click.stop
      class="form"
    >
      <span @click="closeForm" class="form__cancel-btn">×</span>
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
        <label class="form__input-pos__label" for="">Привязка к карточке</label>
        <PersonSelect 
          :selectOptions="selectOptions"
          v-model="card.selectedCard"
          class="form__input-pos__input"
        />
      </div>
      
      <span class="btn-default" @click="addCard">Создать</span>

    </div>
  </div>
</template>

<script>
import PersonSelect from '@/components/PersonAddForm/PersonSelect.vue'

export default {
  components: {PersonSelect},
  data() {
    return {
      notActive: false,
      card: {
        title: '',
        description: '',
        selectedCard: '',
        subordinates: [],
        date: '',
      },
    }
  },
  props: {
    selectOptions: {
      type: Array,
      required: true,
    },
    activeForm: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    addCard() {
      if (this.card.title !== '' && this.card.description !== '') {
        this.card.id = Date.now();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '.' + dd + '.' + yyyy;

        this.card.date = today;
        this.$emit('create', this.card)
        this.card = {
          title: '',
          description: '',
          selectedCard: '',
          subordinates: [],
          date: '',
        }

        this.closeForm();
      } else {
        alert('Ошибка! Поля не заполнены!')
      }
    },
    closeForm() {
      this.$emit('close', this.notActive)
    }
  }
}
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