import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoneCards from '../views/DoneCards.vue'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (JSON.parse(localStorage.getItem('isLogged'))) {
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
        if (JSON.parse(localStorage.getItem('isLogged'))) {
          next();
        } else {
          next("/");
        }
      },
    },
  ]
})

export default router

