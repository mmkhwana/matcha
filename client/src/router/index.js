import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: () =>
            import ('../views/Home.vue')
},
{
  path: '/welcome',
  name: 'Login',
  component: () =>
            import ('../views/Login.vue')
},
{
  path: '/verify/:token/:email',
  name: 'verify',
  component: () =>
            import ('../views/verify.vue')
},
{
  path: '/about',
  name: 'about',
  component: () =>
            import ('../views/About.vue')
},
{
  path: '/Dashboard',
  name: 'Dashboard',
  component: () =>
            import ('../views/Dashboard.vue')
},
{
  path: '/matches',
  name: 'Matches',
  component: () =>
            import ('../views/Matches.vue')
},
{
  path: '/preference',
  name: 'Preference',
  component: () =>
            import ('../views/Preference.vue')
},
{
  path: '/settings',
  name: 'Settings',
  component: () =>
            import ('../views/Settings.vue')
},
{
  path: '/chat',
  name: 'Chat',
  component: () =>
            import ('../views/Chat.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
