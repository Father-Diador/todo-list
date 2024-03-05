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

  const setComment = (params) => {
    console.log(params);
    let card = findById(localCards.value, Number(params.card_id));
    console.log(card);
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    today = year + '-' + month + '-' + day;

    const comment = { id: Date.now(), date: today, value: params.comment } ;
    card.comments.push(comment);
    localStorage.setItem("LocalCards", JSON.stringify(localCards.value));
  };

  // Добавление карточки
  const setCard = (card) => {
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
    console.log(card);
    let head = findById(localCards.value, Number(card.id));
    console.log(head);
    if (!head) {
      console.error("head not found: " + card.selectedCard);
      return;
    }
    editedCard.value = null;
    // head = card;
    head.id = card.id;
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
    localStorage.setItem("allCards", JSON.stringify(localCards.value));
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

  const deleteById = (tree, nodeId) => {
    console.log(tree);
    for (let node of tree) {
      console.log(node.id + ": " + nodeId);
        if (node.id === nodeId) {
          node = null;
          return
        }
        let subordinates = node.subordinates;
        if (!subordinates) continue;
        if (subordinates.length > 0) {
          let desiredNode = deleteById(subordinates, nodeId)
          if (desiredNode) return desiredNode
        } else {
          continue;
        }
    }
  };

  const setDeleteCard = (value) => {
    localCards.value = deleteById(localCards.value, value);
    console.log(localCards.value);
    // console.log(newArray.value.flat());

    // const deletee = (i) => {
    //   i = i.filter((el) => {
    //     if (el.id != value) {
    //       console.log(el.id + ":" + value);
    //       let subordinates = el.subordinates;
    //       if (subordinates.length > 0) {
    //         let desiredNode = deletee(subordinates)
    //         if (desiredNode) {
    //           console.log(desiredNode);
    //           return desiredNode;
    //         }
    //       }
    //       return el;
    //     }
    //   });
    //   console.log(i);
    // };

    // deletee(newArray.value);
    // localCards.value = deletee(newArray.value);
    // console.log(newArray.value);

    // localStorage.setItem("allCards", JSON.stringify(localCards.value));

    // console.log(newArray.value);
  };

  return { localCards, setDeleteCard, setCommentsForCard, commentsForCard, inactiveCards, selectedCard, editedCard, selectedOptions, editCard, changeCardStatus, setCard, setCardFromStorage, setOptionFromStorage, setSelectedCard, setEditedCard, setComment };
});
