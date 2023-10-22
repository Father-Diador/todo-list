import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCards = defineStore('cards', () => {

  const cards = ref([]);
  const inactiveCards = ref([]);
  const selectedCard = ref(null);
  const selectedOptions = ref([]);

  // Поиск в массиве карточек
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

  const setComment = (params) => {
    let card = findById(cards.value, Number(params.card_id));

    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    const comment = { id: Date.now(), date: today, value: params.comment } ;
    card.comments.push(comment);
    localStorage.setItem("allCards", JSON.stringify(cards.value));
  };

  // Добавление карточки
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
      card.status = 1;
      console.log('ПУШ 2');
      cards.value.push(card);
    }
    selectedCard.value = null;
    selectedOptions.value.push(card);
    localStorage.setItem("allCards", JSON.stringify(cards.value));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions.value));
  };

  // Изменение статуса карточки
  const changeCardStatus = (card) => {
    let head = findById(cards.value, Number(card));
    if (!head) {
      console.error("head not found: " + card.selectedCard);
      return;
    }
    head.status = 2;
    localStorage.setItem("allCards", JSON.stringify(cards.value));
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

  return { cards, inactiveCards, selectedCard, selectedOptions, changeCardStatus, setCard, setCardFromStorage, setOptionFromStorage, setSelectedCard, setComment };
});
