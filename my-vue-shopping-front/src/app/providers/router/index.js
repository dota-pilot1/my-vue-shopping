import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/Home/index.vue'
import AboutPage from '@/pages/About/index.vue'
import SignupPage from '@/pages/Signup/index.vue'
import LoginPage from '@/pages/Login/index.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
