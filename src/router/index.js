import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// When pages here are loaded, we scroll to the top of the page.
const topScroll = ['Home', 'Tools']

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/courses/:courseCode',
    name: 'Course',
    component: () => import('../views/Course.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (to, from, savedPosition) => new Promise(resolve => {
    // if (topScroll.indexOf(to.name) > -1) {
    //   return { x: 0, y: 0 }
    // } else {
    //   return savedPosition
    // }
    let position = savedPosition || {}
    if (topScroll.indexOf(to.name) > -1) {
      position = { x: 0, y: 0 }
    }
    router.app.$root.$once('triggerScroll', () => {
      console.log('Scroll Triggered')
      router.app.$nextTick(() => resolve(position))
    })
  })
})

export default router
