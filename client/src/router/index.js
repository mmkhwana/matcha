import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< HEAD
import Dashboard from '../views/Dashboard'
=======
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
<<<<<<< HEAD
=======
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../components/Auth/Login.vue')
  },
  {
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
<<<<<<< HEAD
    path: '/user',
=======
    path: '/Dashboard',
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
<<<<<<< HEAD
    component: Dashboard
=======
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue')
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
  },
  {
    path: '/matches',
    name: 'Matches',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Matches" */ '../views/Matches.vue')
<<<<<<< HEAD
=======
  },
  {
    path: '/preference',
    name: 'Preference',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Preference" */ '../views/Preference.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Settings" */ '../views/Settings.vue')
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
