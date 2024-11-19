import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Menu from '../views/menu.vue'
import calendar from '../views/calendar.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calendar',
      component: calendar
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
  ]
})

export default router
