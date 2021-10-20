import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: (() => import(/* webpackChunkName: "history" */ '@/views/History.vue'))
  }
]

const router = new VueRouter({
  routes
})

export default router
