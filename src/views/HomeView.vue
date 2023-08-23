<template>
    <div class="wrapper">
        <PersonAddForm
            @close="closeForm"
            @create="addCard"
            v-if="activeForm"
            :activeForm="activeForm"
            :selectOptions="selectOptions"
        />
        <PersonList
            @open="openForm"
            :cards="cards"
            :activeForm="activeForm"
        />
    </div>
  </template>
  
  <script>
  import PersonAddForm from '@/components/PersonAddForm/App.vue'
  import PersonList from '@/components/PersonList.vue'
  
  export default {
    components: {
      PersonAddForm,
      PersonList,
    },
    data() {
      return {
        cards: [
          {id: 1, title: 'Task 1', description: 'description...', date: '08.17.2023', priority: '1', selectedCard: '', subordinates: []},
          {id: 2, title: 'Task 2', description: 'description...', date: '08.17.2023', priority: '3', selectedCard: '', subordinates: []},
          {id: 3, title: 'Task 3', description: 'description...', date: '08.17.2023', priority: '3', selectedCard: '', subordinates: 
            [
              {id: 4, title: 'Task 1 for task 3', description: 'description...', date: '08.17.2023', priority: '', selectedCard: '3', subordinates: []}
            ]
          },
          {id: 5, title: 'Task 4', description: 'description...', date: '08.17.2023', priority: '2', selectedCard: '', subordinates: []},
        ],
        selectOptions: [
          {id: 1, title: 'Task 1'},
          {id: 2, title: 'Task 2'},
          {id: 3, title: 'Task 3'},
          {id: 4, title: 'Task 1 for task 3'},
          {id: 5, title: 'Task 4'},
        ],
        activeForm: false,
      }
    },
    methods: {
      findById(tree, nodeId) {
      for (let node of tree) {
          if (node.id === nodeId) return node
          let subordinates = node.subordinates;
          if (!subordinates) continue;
          if (subordinates.length > 0) {
              let desiredNode = this.findById(subordinates, nodeId)
              if (desiredNode) return desiredNode
          } else {
              return;
          }
      }
      return false
      },
      addCard(card) {
  
        if (card.selectedCard !== '') {
            let head = this.findById(this.cards, Number(card.selectedCard));
            // console.log(head);
            if (!head) {
              console.error("head not found: " + card.selectedCard);
              return;
            }
            // console.log(head);
            head.subordinates.push(card);
            // console.log(this.cards);
        }
        else {
            console.log('ПУШ 2');
            this.cards.push(card);
        }
    
        this.selectOptions.push(card);
        
        localStorage.setItem("cards", JSON.stringify(this.cards));
        localStorage.setItem("selectOptions", JSON.stringify(this.selectOptions));
      },
  
      openForm(active) {
        console.log(active)
        if (active == false) {
          this.activeForm = true;
        } else {
          this.activeForm = false;
        }
      },
      closeForm(notActive) {
        console.log(notActive)
        if (notActive == false) {
          this.activeForm = false;
        } else {
          this.activeForm = true;
        }
      },
    },
    beforeMount() {
      if (!JSON.parse(localStorage.getItem('cards'))) {
        localStorage.setItem("cards", JSON.stringify(this.cards));
        localStorage.setItem("selectOptions", JSON.stringify(this.selectOptions));
      } else {
        this.cards = JSON.parse(localStorage.getItem('cards'));
        this.selectOptions = JSON.parse(localStorage.getItem('selectOptions'));
      }
    }
  }
  </script>
  
  <style scoped>
  .wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  </style>