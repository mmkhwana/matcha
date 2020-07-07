<template>
<v-container fluid>
        <div id="users" class="columns">
          <v-row>
          <v-col
             v-for="posts in posts" :key="posts.user_id" class="d-flex child-flex"
              cols="2">
              <v-rating
          :value="2.5"
          dense
          half-increments
          readonly
          size="14"
          background-color="purple lighten-3"
          color="purple"
        ></v-rating>
              <v-card
                   aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2">
                  {{ posts.user_first_name}}
                  {{ posts.user_last_name}}
                  {{ posts.user_gender}}
                  {{ posts.user_age}}
                  <v-btn icon v-on:click="like (posts.user_id)">
                <v-icon>mdi-thumb-up-outline</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-thumb-down</v-icon>
              </v-btn>
             </v-card>
             </v-col>
             </v-row>
             </div>
              </v-container>
</template>
<script>
import matches from '../scripts/matches_component'
export default matches
</script>
