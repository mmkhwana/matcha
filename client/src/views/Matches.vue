<template>
        <v-container fluid>
          <v-row
          align="center"
          justify="center">
            <v-col cols="6">
            <v-expansion-panels
              class="mb-6"
            >
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate>
                Advance Search
                <template v-slot:actions>
                  <v-icon color="success">mdi-magnify</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                  <v-card-title>Age</v-card-title>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                  <v-overflow-btn
                  v-model="age"
                  :items="age_gap"
                  >
                  <v-div></v-div>
                  </v-overflow-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                  <v-card-title>Profile Rating</v-card-title>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                  <v-rating
                    v-model="rating"
                    dense
                    half-increments
                    hover
                    size="10"
                    background-color="grey darken-1"
                    color="lime accent-3"
                    empty-icon="$ratingFull"
                  ></v-rating>
                  <div class="grey--text ml-3">({{ rating }})</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                  <v-card-title><v-row><v-col cols="12">Distance(km)</v-col></v-row></v-card-title>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                  <v-overflow-btn
                  v-model="distance"
                  :items="dist"
                  >
                  <v-div></v-div>
                  </v-overflow-btn>
                  </v-col>
                </v-row>
                  <v-card-title>
                  <v-row>
                    <v-col
                    cols="12"
                    class="text-left"
                    md="6"
                    >
                    Interests
                    </v-col>
                    <v-col cols="12" md="6" class="text-right">
                      <v-menu top left transittion="scroll-x-reverse-transition" max-height='300px'>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus-circle-outline</v-icon>
                          </v-btn>
                        </template>

                        <v-list
                          class="menu-interests"
                          v-for="(item, i) in defaultInterests"
                          :key="i"
                        >
                          <v-list-item
                            link
                            v-on:click="addInterest(item)"
                          >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                  </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text full-width>
                  <v-row>
                  <v-col
                    v-for='(item, index) in interests'
                    :key='index'
                    class="shrink"
                  >
                    <v-chip close filter outlined @click:close="removeInterest(index, item)">{{ item }}</v-chip>
                  </v-col>
                  </v-row>
                </v-card-text>
                <v-row>
                <v-col
                    cols="12"
                    md="12"
                    class="text-right"
                  >
                  <v-btn rounded outlined color="success" v-on:click="search" v-if="!progress">
                    <v-icon left>mdi-magnify</v-icon>search
                  </v-btn>
                  <v-progress-circular class="btn-align" indeterminate color="green" v-else>
                  </v-progress-circular>
                  <v-btn rounded outlined color="error" v-on:click="clear" v-if="!progress">
                    <v-icon left>mdi-close</v-icon>clear
                  </v-btn>
                </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="6">
            </v-col>
          </v-row>
          <v-row>
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
                padding="10px"
                >
                <v-avatar
                size="200px"
                min-width="300px"
                class="show-btns"
                >
                  <img
                    :src="(user.profile === 'none') ? profile_pic : user.profile"
                    :lazy="(user.profile === 'none') ? profile_pic : user.profile"
                    min-width="200px"
                    class="radius-profile"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    @click="openProfile(user.user_id, user.user_first_name, user.user_last_name, user.user_name)"
                  >
                </v-avatar>
                <v-row>
                    <v-col cols="8">
                        <v-card-title class="title text-left">{{ user.user_first_name + ' ' + user.user_last_name }} <span class="text-left online"></span></v-card-title>
                    </v-col>
                    <v-col cols="3">
                    <v-card-subtitle class="text-right">{{ user.user_age }}</v-card-subtitle>
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
                  <v-btn icon v-on:click="unlike(user.user_id)">
                  <v-icon>mdi-thumb-down-outline</v-icon>
                  </v-btn>
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
                  Suggested Cute Catches
                </v-card-title>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
          <v-row
              align="center"
              justify="center"
          >
            <v-flex
              class="images-flex"
            >
            <v-col
              v-for="(user, i) in postsSuggestions"
              :key="i"
              class="images-flex"
              cols="4"
            >
              <v-card elevation="8"
                min-width="300px"
                >
                <v-avatar
                size="200px"
                min-width="300px"
                class="show-btns"
                >
                  <img
                    class="radius-profile"
                    :src="profile_pic"
                    min-width="200px"
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
                  <v-btn icon v-on:click="unlike(user.user_id)">
                  <v-icon>mdi-thumb-down-outline</v-icon>
                  </v-btn>
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
import matches from '../scripts/matches_component'
export default matches
</script>
