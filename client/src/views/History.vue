<template>
        <v-container fluid>
        <v-row
          align="center"
          justify="center">
            <v-col cols="12">
              <v-card elevation="12">
                <v-container>
                <v-card-title class="text-right">
                  Profile you viewed
                </v-card-title>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row
          >
            <v-flex
              class="images-flex"
            >
            <v-col
              v-for="(user, i) in posts"
              :key="i"
              class="images-flex"
              cols="4"
            >
              <v-card elevation="8"
                min-width="300px"
                >
                <v-row fullwidth><v-col cols="12"></v-col></v-row>
                <v-avatar
                size="200px"
                min-width="300px"
                class="show-btns"
                >
                  <img
                    :src="profile_pic"
                    class="radius-profile"
                    min-width="200px"
                    min-height="200px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    @click="openProfile(user.user_id, user.user_first_name, user.user_last_name, user.user_name)"
                  >
                </v-avatar>
                <v-row>
                    <v-col>
                        <v-card-title class="title">{{ user.user_first_name + ' ' + user.user_last_name }}</v-card-title>
                    </v-col>
                    <v-col cols="3">
                    <v-card-subtitle class="text-left">{{ user.user_age }}</v-card-subtitle>
                    </v-col>
                </v-row>
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
                  <v-chip filter outlined v-if="user.interests">{{user.interests + interes}}</v-chip>
                 </v-card-actions>
              </v-card>
            </v-col>
            </v-flex>
          </v-row>
                  <v-row
          align="center"
          justify="center">
            <v-col cols="12">
              <v-card elevation="12">
                <v-container>
                <v-card-title class="text-right">
                  People who viewed you
                </v-card-title>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

<v-row
          >
            <v-flex
              class="images-flex"
            >
            <v-col
              v-for="(user, i) in peopleViewedYou"
              :key="i"
              class="images-flex"
              cols="4"
            >
              <v-card elevation="8"
                min-width="300px"
                >
                <v-row fullwidth><v-col cols="12"></v-col></v-row>
                <v-avatar
                size="200px"
                min-width="300px"
                class="show-btns"
                >
                  <img
                    :src="(user.profile !== 'none') ? user.profile : profile_pic"
                    class="radius-profile"
                    min-width="200px"
                    min-height="200px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    @click="openProfile(user.user_id, user.user_first_name, user.user_last_name, user.user_name)"
                  >
                </v-avatar>
                <v-row>
                    <v-col>
                        <v-card-title class="title">{{ user.user_first_name + ' ' + user.user_last_name }}</v-card-title>
                    </v-col>
                    <v-col cols="3">
                    <v-card-subtitle class="text-left">{{ user.user_age }}</v-card-subtitle>
                    </v-col>
                </v-row>
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
                  <v-chip filter outlined v-if="user.interests">{{user.interests + interes}}</v-chip>
                 </v-card-actions>
              </v-card>
            </v-col>
            </v-flex>
          </v-row>

        <v-row
          align="center"
          justify="center">
            <v-col cols="12">
              <v-card elevation="12">
                <v-container>
                <v-card-title class="text-right">
                  People who liked you
                </v-card-title>
                </v-container>
              </v-card>
            </v-col>
          </v-row>

          <v-row
          >
            <v-flex
              class="images-flex"
            >
            <v-col
              v-for="(user, i) in peopleLikedYou"
              :key="i"
              class="images-flex"
              cols="4"
            >
              <v-card elevation="8"
                min-width="300px"
                >
                <v-row fullwidth><v-col cols="12"></v-col></v-row>
                <v-avatar
                size="200px"
                min-width="300px"
                class="show-btns"
                >
                  <img
                    :src="profile_pic"
                    class="radius-profile"
                    min-width="200px"
                    min-height="200px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    @click="openProfile(user.user_id, user.user_first_name, user.user_last_name, user.user_name)"
                  >
                </v-avatar>
                <v-row>
                    <v-col>
                        <v-card-title class="title">{{ user.user_first_name + ' ' + user.user_last_name }}</v-card-title>
                    </v-col>
                    <v-col cols="3">
                    <v-card-subtitle class="text-left">{{ user.user_age }}</v-card-subtitle>
                    </v-col>
                </v-row>
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
                  <v-chip filter outlined v-if="user.interests">{{user.interests + interes}}</v-chip>
                 </v-card-actions>
              </v-card>
            </v-col>
            </v-flex>
          </v-row>
        </v-container>
</template>
<style scoped src='../assets/css/matches.css'>
</style>
<script>
import history from '../scripts/history_component'
export default history
</script>
