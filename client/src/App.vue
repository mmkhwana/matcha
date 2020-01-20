<template>
  <v-app>
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
//  import Login from './components/Auth/Login'
//  import Signup from './components/Auth/Signup'
import Home from './views/Home'

export default {
  name: 'App',

  components: {
    Home
  },

  data: () => ({
    //
  })
}
</script>
