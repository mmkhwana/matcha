<template>
  <v-card
    class="mx-auto my-12"
  >
     <v-container id="dropdown-example-1">
       <v-card-title>Age</v-card-title>
        <v-overflow-btn
        v-model="age"
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
          background-color="grey darken-1"
          color="lime accent-3"
          empty-icon="$ratingFull"
        ></v-rating>

        <div class="grey--text ml-3">({{ rating }})</div>
      </v-row>
    </v-card-text>
    <v-container id="dropdown-example-2">
      <v-card-title>Location distance (KM)</v-card-title>
    <v-radio-group v-model="distance">
      <v-radio
        v-for="n in dist"
        :key="n"
        :label="`${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    </v-container>

    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <v-row>
        <v-col
          v-for="(name, i) in interests"
          :key="i"
          class="shrink"
        >
          <v-chip close filter outlined v-on:click:close="remove(i, name)">{{ name }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn rounded outlined color="success" v-on:click="prefId === -404 ? sendData() : updatePref()">
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
