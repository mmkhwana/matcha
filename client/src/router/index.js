import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD
import Dashboard from '../views/Dashboard'
=======
>>>>>>> mdu

Vue.use(VueRouter)

const routes = [
  {
<<<<<<< HEAD
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
=======
>>>>>>> mdu
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
<<<<<<< HEAD
  },
  {
    path: '/user',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard
  },
  {
    path: '/matches',
    name: 'Matches',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Matches" */ '../views/Matches.vue')
=======
>>>>>>> mdu
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
