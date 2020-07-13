<template>
  <v-container>
    <v-card
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
          <p class="Online">Online: {{ users.length }}</p>
            <v-list-item >
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>

              <v-list-item-content
                e v-on:click="Matchesliker(user.user_liker_id,user.user_liked_id )"
                  v-for="i in items"
                  :key="i.Users"
              >
              {{ i.Users }}
              <!-- <p class="surname">{{ username }}</p> -->
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
            <!-- <template>
              <keep-alive>
                <component :is="Users">
                  <OnlineUser v-bind:messages="messages" v-on:sendMessage="this.sendMessage"/
                </component>
              </keep-alive>
            </template> -->
            <OnlineUser :value="messages" @sendMessage="updateMessage"/>
      </v-card-text>
       </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import chat from '../scripts/chat_component'
export default chat
</script>
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2%;
  color: black;
  margin: 0;
  padding: 0;
}
</style>
