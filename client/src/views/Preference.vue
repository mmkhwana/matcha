<template>
  <v-card
    class="mx-auto my-12"
  >
     <v-container>
       <v-card-title>Age</v-card-title>
        <v-overflow-btn
        v-model="age"
        :items="dropdown_icon"
        label=""
        >
        <v-div></v-div>
        </v-overflow-btn>
    </v-container>

     <v-container>
       <v-card-title>Gender</v-card-title>
        <v-overflow-btn
        v-model="gender"
        :items="gender_type"
        label=""
        >
        <v-div></v-div>
        </v-overflow-btn>
    </v-container>
    <v-container>
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
