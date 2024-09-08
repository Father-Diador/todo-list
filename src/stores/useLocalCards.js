import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLocalCards = defineStore('useLocalCards', () => {

  const localCards = ref([]);
  const inactiveCards = ref([]);
  const selectedCard = ref(null);
  const editedCard = ref(null);
  const selectedOptions = ref([]);

  const commentsForCard = ref(null);

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
          continue;
        }
    }
    return false
  };

  // Добавление комментариев
  const setComment = (params) => {
    console.log("Добавление комментариев карточки");
    console.log(params);
    let card = findById(localCards.value, Number(params.card_id));
    console.log(card);
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    const comment = { id: Date.now(), date: today, value: params.comment };
    card.comments.push(comment);
    localStorage.setItem("LocalCards", JSON.stringify(localCards.value));
  };

  // Добавление карточки
  const setCard = (card) => {
    console.log("Создание карточки");
    if(selectedCard.value) {
      card.selectedCard = selectedCard.value;
    }
    if (card.selectedCard != '') {
      console.log('PUSH 1');
      console.log(card.selectedCard);
      let head = findById(localCards.value, Number(card.selectedCard));
      if (!head) {
      console.error("head not found: " + card.selectedCard);
      return;
    }
      head.subordinates.push(card);
    }
    else {
      card.status = 1;
      console.log('ПУШ 2');
      localCards.value.push(card);
    }
    selectedCard.value = null;
    selectedOptions.value.push(card);
    localStorage.setItem("LocalCards", JSON.stringify(localCards.value));
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions.value));
  };

  // Изменение статуса карточки
  const changeCardStatus = (card) => {
    console.log("Изменение статуса карточки");
    let head = findById(localCards.value, Number(card));
    if (!head) {
      console.error("head not found: " + card.selectedCard);
      return;
    }
    head.status = 2;
    localStorage.setItem("allCards", JSON.stringify(localCards.value));
  };

  // Изменение карточки
  const editCard = (card) => {
    console.log("Изменение карточки");
    console.log(card);
    let head = findById(localCards.value, Number(card.id));
    console.log(head);
    if (!head) {
      console.error("head not found: " + card.selectedCard);
      return;
    }
    editedCard.value = null;
    head.id = card.id;
    head.color = card.color;
    head.priority = card.priority;
    head.title = card.title;
    head.description = card.description;
    head.selectedCard = card.selectedCard;
    head.subordinates = card.subordinates;
    head.tags = card.tags;
    head.posts = card.posts;
    head.comments = card.comments;
    head.date = card.date;
    head.endDate = card.endDate;
    console.log(localCards.value);
    localStorage.setItem("LocalCards", JSON.stringify(localCards.value));
  };

  const setCardFromStorage = (value) => {
    localCards.value = value;
  };

  const setOptionFromStorage = (value) => {
    selectedOptions.value = value;
  };

  const setSelectedCard = (value) => {
    selectedCard.value = value;
  };

  const setCommentsForCard = (value) => {
    commentsForCard.value = value;
  };

  const setEditedCard = (value) => {
    editedCard.value = value;
  };


  const setDeleteCard = (value) => {
    console.log("Удаление карточки");
    console.log(value);
  };

  return { localCards, setDeleteCard, setCommentsForCard, commentsForCard, inactiveCards, selectedCard, editedCard, selectedOptions, editCard, changeCardStatus, setCard, setCardFromStorage, setOptionFromStorage, setSelectedCard, setEditedCard, setComment };
});
