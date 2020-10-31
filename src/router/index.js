import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// When pages here are loaded, we scroll to the top of the page.
const topScroll = ['Home']

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tools/:year?/',
    name: 'Tools',
    component: () => import('../views/Tools.vue')
  },
  {
    path: '/tools/:year/:courseCode',
    name: 'Class',
    component: () => import('../views/Class.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (topScroll.indexOf(to.name) > -1) {
      return { x: 0, y: 0 }
    } else {
      return savedPosition
    }
  }
})

export default router
