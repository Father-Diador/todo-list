<template>
    <div class="wrapper">
        <SideBar />
        <CardForm
            v-if="isOpen"
            :selectOptions="selectOptions"
        />
        <CardList />
        <DashBoard />
    </div>
</template>
  
<script setup>
import { useCards } from "@/stores/useCards";
const cardsStore = useCards();
const { selectedOptions, cards, setCardFromStorage, setOptionFromStorage } = cardsStore;
const cardPush = (value) => { setCardFromStorage(value) };
const optionsPush = (value) => { setOptionFromStorage(value) };


import CardForm from '@/components/CardCreateForm/App.vue'
import CardList from '@/components/CardList.vue'
import SideBar from '@/components/SideBar.vue'
import DashBoard from '@/components/DashBoard.vue'
import { reactive, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "@/stores/useMenu";

const menuStore = useMenu();
const { isOpen } = storeToRefs(menuStore);

// let cards = reactive([]);

// let selectOptions = reactive([]);

// const findById = (tree, nodeId) => {
//   console.log(tree);
//   for (let node of tree) {
//     console.log(node.id + ": " + nodeId);
//       if (node.id === nodeId) return node
//       let subordinates = node.subordinates;
//       if (!subordinates) continue;
//       if (subordinates.length > 0) {
//         let desiredNode = findById(subordinates, nodeId)
//         if (desiredNode) return desiredNode
//       } else {
//         return;
//       }
//   }
//   return false
// };

// const addCard = (card) => {
//   if (card.selectedCard != '') {
//       console.log('PUSH 1');
//       console.log(card.selectedCard);
//       let head = findById(cards, Number(card.selectedCard));
//       if (!head) {
//         console.error("head not found: " + card.selectedCard);
//         return;
//       }
//       head.subordinates.push(card);
//   }
//   else {
//     console.log('ПУШ 2');
//     cards.push(card);
//   }
    
//   selectOptions.push(card); 
//   localStorage.setItem("cards", JSON.stringify(cards));
//   localStorage.setItem("selectOptions", JSON.stringify(selectOptions));
// };

onBeforeMount(() => {
  if (!JSON.parse(localStorage.getItem('allCards'))) {
    console.log(111);
    localStorage.setItem("allCards", JSON.stringify(cards));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  } else {
    console.log(222);
    cardPush(JSON.parse(localStorage.getItem('allCards')));
    optionsPush(JSON.parse(localStorage.getItem('selectedOptions')))
    
  }
});
</script>
  
<style lang="scss" scoped>
.wrapper{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}
</style>