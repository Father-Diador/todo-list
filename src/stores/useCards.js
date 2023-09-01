import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCards = defineStore('cards', () => {

  const cards = ref([]);
  const selectedCard = ref(null);
  const selectedOptions = ref([]);

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
    if(selectedCard.value) {
      card.selectedCard = selectedCard.value;
    }
    if (card.selectedCard != '') {
      console.log('PUSH 1');
      console.log(card.selectedCard);
      let head = findById(cards.value, Number(card.selectedCard));
      if (!head) {
      console.error("head not found: " + card.selectedCard);
      return;
    }
      head.subordinates.push(card);
    }
    else {
      console.log('ПУШ 2');
      cards.value.push(card);
    }

    selectedCard.value = null;
          
    selectedOptions.value.push(card);

    localStorage.setItem("allCards", JSON.stringify(cards.value));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions.value));
  };

  const setCardFromStorage = (value) => {
    cards.value = value;
  };

  const setOptionFromStorage = (value) => {
    selectedOptions.value = value;
  };

  const setSelectedCard = (value) => {
    selectedCard.value = value;
  };

  return { cards, selectedCard, selectedOptions, setCard, setCardFromStorage, setOptionFromStorage, setSelectedCard };
});
