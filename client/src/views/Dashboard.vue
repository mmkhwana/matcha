<template>
  <v-card height="100%">
    <v-app-bar
        color="deep-purple lighten-3"
        dark
        width="100%"
    >
          <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>
        <v-btn icon
        float="right"
        >
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon
        float="right"
        >
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      expand-on-hover
      permanent
      max-height="100"
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
    <v-layout
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="100"
    >
      <v-container style="height: 100%;"></v-container>
    </v-layout>
  </v-card>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Dashboard',
  data () {
    return {
      items: [{ title: 'Profile', icon: 'mdi-account' },
        { title: 'Preference', icon: 'mdi-settings-transfer' },
        { title: 'Matches', icon: 'mdi-account-group' },
        { title: 'Log Out', icon: 'mdi-logout' }]
    }
  }
}
</script>
