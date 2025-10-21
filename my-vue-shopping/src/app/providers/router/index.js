import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/Home/index.vue'
import AboutPage from '@/pages/About/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
