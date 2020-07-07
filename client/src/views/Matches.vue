<template>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="user in posts"
              :key="user"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card elevation="8">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                  <v-card-title class="title">{{ user.user_first_name + ' ' + user.user_last_name }}</v-card-title>
                   <v-card-subtitle class="white--text">{{ user.user_age }}</v-card-subtitle>
                </v-img>
                 <v-card-actions>
                  <v-rating
                    :value="user.user_likes"
                    dense
                    half-increments
                    readonly
                    size="14"
                    background-color="lime accent-3"
                    color="lime accent-3"
                  ></v-rating>
                 </v-card-actions>
                 <v-card-actions>
                  <v-btn icon v-on:click="like(user.user_id)">
                  <v-icon>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-thumb-down</v-icon>
                  </v-btn>
                 </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
</template>
<script>
import matches from '../scripts/matches_component'
export default matches
</script>
