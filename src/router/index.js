import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import AllCards from '../views/AllCards.vue'
import DoneCards from '../views/DoneCards.vue'
import LocalCards from '../views/LocalCards.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/allcards',
      name: 'allcards',
      component: AllCards,
      beforeEnter: (to, from, next) => {
        if (document.cookie) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: '/donecards',
      name: 'donecards',
      component: DoneCards,
      beforeEnter: (to, from, next) => {
        if (document.cookie) {
          next();
        } else {
          next("/");
        }
      },
    },
    {
      path: '/localcards',
      name: 'localcards',
      component: LocalCards,
      beforeEnter: (to, from, next) => {
        if (document.cookie) {
          next();
        } else {
          next("/");
        }
      },
    },
  ]
})

export default router

