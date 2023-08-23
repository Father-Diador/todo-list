<template>
  <div class="table-wrapper">
    <div class="btn-default" @click="openForm">Добавить</div>

    <!-- <div class="table">
      <div class="sort-btn" @click="nameSort">Имя</div>
      <div class="sort-btn" @click="telephoneSort">Телефон</div>
    </div> -->

    <SingleCard 
      v-for="card in sortedArray" 
      :key="card.id"
      :card="card"
    />

  </div>
</template>

<script>
import SingleCard from '@/components/SingleCard.vue'

export default {
  components: {SingleCard},
  data() {
    return {
      active: false,
      selectedSort: '',
    }
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    activeForm: {
      type: Boolean,
      required: true,
    }
  },
  methods: {
    openForm() {
      this.$emit('open', this.active)
    },
    
    nameSort() {
      this.selectedSort = 'name';
    },
    telephoneSort() {
      this.selectedSort = 'telephone';
    },
  },
  computed: {
    sortedArray() {
      return [...this.cards].sort((card1, card2) => (card1[this.selectedSort] > card2[this.selectedSort]) ? 1 : -1)
    },
    getCards() {
      return this.cards;
    }
  }
}
</script>

<style scoped>
.table-wrapper{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 20px;
  align-items: flex-start;
}
.table{
  display: flex;
  /* flex-direction: row; */
  width: 100%;
}
.table div{
  width: 50%;
  padding: 20px;
  border: 2px solid #000;
}
.sort-btn{
  cursor: pointer;
}
.sort-btn:hover{
  background: #ccc;
}
</style>