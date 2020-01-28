import Vue from 'vue'
import vuetify from './plugins/vuetify.js'
<<<<<<< HEAD
=======

>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
