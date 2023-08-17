import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const getTasks = defineStore('tasks', () => {
  const tasks = reactive([
    {id: 1, title: 'iu', comment: 'comment'},
  ]);

  return { tasks };
});
