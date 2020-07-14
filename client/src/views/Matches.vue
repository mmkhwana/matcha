<template>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="(user, i) in posts"
              :key="i"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card elevation="8">
                <v-img
                  :src="`http://localhost:5000/api/posts/uploads/kmbukuts/landing.jpg`"
                  :lazy-src="`http://localhost:5000/api/posts/uploads/kmbukuts/landing.jpg`"
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2 show-btns"
                  @click="openProfile(user.user_id, user.user_first_name, user.user_last_name)"
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
                    :ref="`rating${user.user_id}`"
                    dense
                    half-increments
                    hover
                    size="14"
                    background-color="grey darken-1"
                    color="lime accent-3"
                    empty-icon="$ratingFull"
                  ></v-rating>
                 </v-card-actions>
                 <v-card-actions>
                  <v-btn icon v-on:click="like(user.user_id)">
                  <v-icon>mdi-thumb-up-outline</v-icon>
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-chip filter outlined>{{likes_no}}</v-chip>
                 </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row
          align="center"
          justify="center">
            <v-col cols="12">
              <v-card elevation="12">
                <v-container>
                <v-card-title class="text-right">
                  Suggested Cute Catches
                </v-card-title>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              v-for="(user, i) in postsSuggestions"
              :key="i"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card elevation="8">
                <v-img
                  :src="`http://localhost:5000/api/posts/uploads/kmbukuts/landing.jpg`"
                  :lazy-src="`http://localhost:5000/api/posts/uploads/kmbukuts/landing.jpg`"
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2 show-btns"
                  @click="openProfile(user.user_id, user.user_first_name, user.user_last_name)"
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
                  <v-chip filter outlined>{{likes_no}}</v-chip>
                 </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
</template>
<style scoped src='../assets/css/matches.css'>
</style>
<script>
import matches from '../scripts/matches_component'
export default matches
</script>
