<template>
  <div
    width="100%"
  >
    <v-app-bar
      dark
        width="100%"
        prominent
        elevation="10"
        shrink-on-scroll
        fixed
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title ref="title" color="grey darken-4">{{titles}}</v-toolbar-title>

      <v-spacer></v-spacer>
        <v-btn icon @click="logout">
            <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      class="nav-items-padding"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src= profile></v-img>
        </v-list-item-avatar>
        <v-list-item-title >{{ fullname }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
      <v-list
      nav
      dense
      >
      <v-list-item-group
       v-model="check"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon v-if="item.title !== 'Log Out'">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-on:click="changeTitles(item.title)">
              <v-list-item-title v-if="item.title !== 'Log Out'">{{ item.title }}</v-list-item-title>
              <v-list-item-title v-else><v-btn block>{{ item.title }}</v-btn></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-card-text
    class="content-padding"
    >
    <v-container>
    <v-row>
    <v-col cols="12">
     <template class="mx-auto scrolly">
       <keep-alive>
          <component :is="titles"></component>
       </keep-alive>
    </template>
    </v-col>
    </v-row>
    </v-container>
    </v-card-text>
    <Alert/>
     <v-card height="auto" class="footer">
        <v-footer
          dark
          :padless="true"
          absolute
        >
          <v-card
            width="100%"
            flat
            tile
            class="lighten-3 white--text text-center"
          >
            <v-card-text>
            </v-card-text>
            <v-card-text class="white--text pt-0">
This site is built to allow two potential lovers to meet. No bullshit.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text">
              {{ new Date().getFullYear() }} — <strong>Matcha</strong>
            </v-card-text>
          </v-card>
        </v-footer>
      </v-card>
  </div>
</template>
<style src="../assets/css/dashboard.css" lang="css">
</style>
<script>
import dashboard from '../scripts/dashboard_component'
export default dashboard
</script>
