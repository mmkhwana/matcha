<template>
  <v-card
    class="mx-auto scrolly"
    height="100vh"
    width="100%"
  >
    <v-app-bar
      dark
        width="100%"
        prominent
        elevation="12"
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
         <v-toolbar-title ref="title">{{titles}}</v-toolbar-title>

      <v-spacer></v-spacer>
                <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                v-bind="attrs"
                v-on="on"
              >
                <v-badge
                  color="red"
                  :content = count
                >
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in notifications"
                :key="i"
              >
                <v-list-item-avatar>
                  <v-img :src= profile></v-img>
                </v-list-item-avatar>
                <v-list-item-title>{{ item.message }}</v-list-item-title>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-menu>
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
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-on:click="changeTitles(item.title)">
              <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-row>
    <v-col cols="12">
    <v-card-text
    class="content-padding"
    >
     <template>
       <keep-alive>
          <component :is="titles"></component>
       </keep-alive>
    </template>
    </v-card-text>
    </v-col>
    </v-row>
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
              <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-4"
                icon
              >
                <v-icon size="24px">{{ icon }}</v-icon>
              </v-btn>
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
  </v-card>
</template>
<style src="../assets/css/dashboard.css" lang="css">
</style>
<script>
import dashboard from '../scripts/dashboard_component'
export default dashboard
</script>
