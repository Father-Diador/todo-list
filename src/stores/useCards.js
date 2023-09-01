import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useCards = defineStore('cards', () => {

  const cards = reactive([]);
  const selectedOptions = reactive([]);

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

  const setCard = (card) => {
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
          
    selectedOptions.push(card); 
    localStorage.setItem("allCards", JSON.stringify(cards));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  };

  const setCardFromStorage = (value) => {
    // cards.push(value);
  };

  const setOptionFromStorage = (value) => {
    // selectedOptions.value = value;
  };

  return { cards, selectedOptions, setCard, setCardFromStorage, setOptionFromStorage };
});
