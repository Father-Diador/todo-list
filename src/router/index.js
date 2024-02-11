import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoneCards from '../views/DoneCards.vue'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/donecards',
      name: 'donecards',
      component: DoneCards,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
  ]
})

export default router

