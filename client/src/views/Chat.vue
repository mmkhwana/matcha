<template>
  <v-container>
    <v-card
      height="400"
    >
      <v-row>
      <v-col cols="3">
        <v-navigation-drawer
          v-model="drawer"
          :expand-on-hover="expandOnHover"
          :mini-variant="miniVariant"
          :right="right"
          :src="bg"
          color="deep-purple lighten-3"
          dark
        >
          <v-list
            dense
            nav
            class="py-0"
          >
            <v-list-item two-line :class="miniVariant && 'px-0'">
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>

              <v-list-item-content
                e v-on:click="chattingUser()"
                  v-for="i in items"
                  :key="i.Users"
              >
              {{ i.Users }}
                <v-list-item-title>
                  </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>

          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="10" sm="8">
      <v-card-text>
            <template>
              <keep-alive>
                <component :is="Users"></component>
              </keep-alive>
            </template>
      </v-card-text>
       </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import OnlineUser from '../components/OnlineUser.vue'
import Vue from 'vue'
Vue.component('Online User', OnlineUser)
export default {
  name: 'Chat',
  data () {
    return {
      items: [{ 'Users': 'Username' }],
      Users: 'Username'
    }
  },
  mounted () {
    this.$root.$on('OnlineUser', () => {
      this.Users = 'Online User'
    })
  },
  methods: {
    chattingUser () {
      this.$root.$emit('OnlineUser')
    }
  }
}
</script>
