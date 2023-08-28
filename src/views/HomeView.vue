<template>
    <div class="wrapper">
        <CardForm
            v-if="isOpen"
            @create="addCard"
            :selectOptions="selectOptions"
        />
        <CardList :cards="cards" />
    </div>
</template>
  
<script setup>
import CardForm from '@/components/CardCreateForm/App.vue'
import CardList from '@/components/CardList.vue'
import { reactive, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "@/stores/useMenu";

const menuStore = useMenu();
const { isOpen } = storeToRefs(menuStore);

let cards = reactive([]);

let selectOptions = reactive([]);

const findById = (tree, nodeId) => {
  console.log(tree);
  for (let node of tree) {
    console.log(node.id + ": " + nodeId);
      if (node.id === nodeId) return node
      let subordinates = node.subordinates;
      if (!subordinates) continue;
      if (subordinates.length > 0) {
        let desiredNode = findById(subordinates, nodeId)
        if (desiredNode) return desiredNode
      } else {
        return;
      }
  }
  return false
};

const addCard = (card) => {
  if (card.selectedCard != '') {
      console.log('PUSH 1');
      console.log(card.selectedCard);
      let head = findById(cards, Number(card.selectedCard));
      if (!head) {
        console.error("head not found: " + card.selectedCard);
        return;
      }
      head.subordinates.push(card);
  }
  else {
    console.log('ПУШ 2');
    cards.push(card);
  }
    
  selectOptions.push(card); 
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("selectOptions", JSON.stringify(selectOptions));
};

onBeforeMount(() => {
  if (!JSON.parse(localStorage.getItem('cards'))) {
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("selectOptions", JSON.stringify(selectOptions));
  } else {
    cards = JSON.parse(localStorage.getItem('cards'));
    selectOptions = JSON.parse(localStorage.getItem('selectOptions'));
  }
});
</script>
  
<style scoped>
.wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>