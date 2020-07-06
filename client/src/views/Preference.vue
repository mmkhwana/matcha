<template>
  <v-card
    class="mx-auto my-12"
  >
     <v-container id="dropdown-example-1">
       <v-card-title>Age</v-card-title>
        <v-overflow-btn
        v-model="item"
        :items="dropdown_icon"
        label=""
        target = "#dropdown-example-1"
        >
        <v-div></v-div>
        </v-overflow-btn>
    </v-container>

     <v-container id="dropdown-example-1">
       <v-card-title>Gender</v-card-title>
        <v-overflow-btn
        v-model="gender"
        :items="gender_type"
        label=""
        target = "#dropdown-example-1"
        >
        <v-div></v-div>
        </v-overflow-btn>
    </v-container>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      <v-card-title>Profile Rating</v-card-title>
        <v-rating
          v-model="rating"
          dense
          half-increments
          hover
          size="14"
          background-color="purple lighten-3"
          color="purple"
        ></v-rating>

        <div class="grey--text ml-3">({{ rating }})</div>
      </v-row>
    </v-card-text>
    <v-container id="dropdown-example-2">
      <v-card-title>Language</v-card-title>
        <v-overflow-btn
        class="my-2"
        v-model="language"
        :items="languages"
        label=""
        overflow
        target="#dropdown-example-2"
        ></v-overflow-btn>
    </v-container>
    <v-container id="dropdown-example-2">
      <v-card-title>Location</v-card-title>
        <v-autocomplete
        class="my-2"
        v-model="location"
        :items="results"
        label="Location preference"
        overflow
        target="#dropdown-example-2"
        ref="auto"
        ></v-autocomplete>
      <input ref="input"/>
      <div id="location-window">
        <img src="" width="16" height="16" id="place-icon">
        <span id="place-name"  class="title"></span><br>
        <span id="place-address"></span>
      </div>
    </v-container>

    <v-divider class="mx-4"></v-divider>

    <v-row>
      <v-col cols="10" class="text-left">
        <v-card-title>Interest(s)</v-card-title>
      </v-col>
      <v-col cols="2" class="text-right">
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
    <v-card-text>
      <v-row>
        <v-col
          v-for="(name, i) in interests"
          :key="i"
          class="shrink"
        >
          <v-chip close filter outlined v-on:click:close="remove(i)">{{ name }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn rounded outlined color="success" v-on:click="sendData">
            <v-icon left>mdi-check</v-icon>save
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<style scoped src='../assets/css/pref.css' lang='css'>
</style>
<script>
import preferences from '../scripts/preferences_component'
export default preferences
</script>
