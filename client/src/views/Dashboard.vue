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
          <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
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
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </v-col>
    <v-col cols="10" sm="8">
    <v-card-text
    >
    <Matches/>
    </v-card-text>
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
// @ is an alias to /src
import Matches from '../views/Matches'
export default {
  name: 'Dashboard',
  data () {
    return {
      items: [{ title: 'Profile', icon: 'mdi-account' },
        { title: 'Preference', icon: 'mdi-settings-transfer' },
        { title: 'Matches', icon: 'mdi-account-group' },
        { title: 'Log Out', icon: 'mdi-logout' }]
    }
  },
  components: {
    Matches
  }
}
</script>
