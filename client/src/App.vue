<template>
  <v-app>
<<<<<<< HEAD
    <v-content>
      <router-view/>
    </v-content>
=======
    <Login/>
>>>>>>> mdu
  </v-app>
</template>

<script>
<<<<<<< HEAD

export default {
  name: 'App',

  data: () => ({
    //
  })
=======
import Login from './components/Auth/Login'
export default {
  name: 'app',
  components: {
    Login
  }
>>>>>>> mdu
}
</script>
