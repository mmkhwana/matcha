<template>
  <v-card
    height="100%"
    width="100%"
  >
    <v-app-bar
        color="deep-purple lighten-3"
        dark
        width="100%"
    >
<<<<<<< HEAD
          <v-toolbar-title>Dashboard</v-toolbar-title>
=======
         <v-toolbar-title>{{titles}}</v-toolbar-title>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae

      <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
<<<<<<< HEAD
        <v-btn icon>
=======
        <v-btn icon @click="logout">
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-row>
    <v-col cols="2">
    <v-navigation-drawer
      v-model="drawer"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/home.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="title">Khanyisa Mbukutshe</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
<<<<<<< HEAD
            <v-list-item-title>{{ item.title }}</v-list-item-title>
=======
              <v-list-item-title v-on:click="changeTitles(item.title)">{{ item.title }}</v-list-item-title>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </v-col>
    <v-col cols="10" sm="8">
    <v-card-text
    >
<<<<<<< HEAD
    <Matches/>
=======
     <template>
       <keep-alive>
    <component :is="titles"></component>
       </keep-alive>
    </template>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
    </v-card-text>
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
// @ is an alias to /src
import Matches from '../views/Matches'
import Preference from '../views/Preference'
import Profile from '../views/Profile'
import Edit from '../views/ProfileEdit'
import router from '../router'
import VueSession from 'vue-session'
import Settings from '../views/Settings'
import Vue from 'vue'
Vue.use(VueSession)
Vue.component('Preference', Preference)
Vue.component('Matches', Matches)
Vue.component('Profile', Profile)
Vue.component('Settings', Settings)
Vue.component('Edit', Edit)
export default {
  name: 'Dashboard',
  data () {
    return {
      items: [{ title: 'Profile', icon: 'mdi-account' },
        { title: 'Preference', icon: 'mdi-settings-transfer' },
        { title: 'Matches', icon: 'mdi-account-group' },
<<<<<<< HEAD
        { title: 'Log Out', icon: 'mdi-logout' }]
    }
  },
  components: {
    Matches
=======
        { title: 'Chat', icon: 'mdi-chat' },
        { title: 'Settings', icon: 'mdi-settings' },
        { title: 'Log Out', icon: 'mdi-logout' }],
      titles: 'Profile'
    }
  },
  computed: {
    changeComponents () {
      if (this.titles === 'Preference') {
        return 'Preference'
      } else if (this.titles === 'Matches') {
        return 'Matches'
      } else if (this.titles === 'Settings') {
        return 'Settings'
      } else if (this.titles === 'Profile Edit') {
        return 'Edit'
      } else {
        return 'Profile'
      }
    }
  },
  mounted () {
    this.$root.$on('Edit', () => {
      this.titles = 'Edit'
    })
  },
  methods: {
    async changeTitles (titleName) {
      if (titleName === 'Log Out') {
        if (this.$session.exists()) {
          this.$session.clear()
          this.$session.destroy()
          router.push({ name: 'Login' })
        }
      } else {
        this.titles = titleName
      }
    },
    logout () {
    //  this.$session.start()
      if (this.$session.exists()) {
        this.$session.clear()
        this.$session.destroy()
        router.push({ name: 'home' })
      }
    }
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
  }
}
</script>
