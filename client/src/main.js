import Vue from 'vue'
<<<<<<< HEAD
import vuetify from './plugins/vuetify.js'
=======
import './plugins/vuetify.js'
>>>>>>> mdu
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
<<<<<<< HEAD
  vuetify,
=======
>>>>>>> mdu
  render: h => h(App)
}).$mount('#app')
