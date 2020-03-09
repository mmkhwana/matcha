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

        <div class="grey--text ml-3">({{rating}})</div>
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
        <v-overflow-btn
        class="my-2"
        v-model="location"
<<<<<<< HEAD
        :items="locations"
        label=""
=======
        :items="results"
        label="Location preference"
>>>>>>> 4a6f6d31ec41caf088dde985d1db72771d9b8fad
        overflow
        target="#dropdown-example-2"
        ></v-overflow-btn>
    </v-container>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Interest</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4"
        column
        multiple
      >
        <v-chip filter outlined>Going out</v-chip>

        <v-chip filter outlined>Drinking</v-chip>

        <v-chip filter outlined>Smoking</v-chip>

        <v-chip filter outlined>Tattoos</v-chip>

        <v-chip filter outlined>Some Nice honeys</v-chip>
      </v-chip-group>
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
<script>
import PreferenceService from '../PreferenceService'

export default {
  name: 'Preference',
  data: function () {
    return {
      rating: '0.5',
      item: null,
      gender: null,
      language: null,
      location: null,
      locations: [],
      dropdown_icon: [{ text: '18-21' }, { text: '22-25' }, { text: '26-29' }, { text: '30-33' }, { text: '34-37' }],
<<<<<<< HEAD
      languages: [{ text: 'English' }, { text: 'Xhosa' }, { text: 'Zulu' }, { text: 'Sotho' }, { text: 'Sepedi' }],
      gender_type: [{ text: 'Women' }, { text: 'Men' }, { text: 'Lesbians' }, { text: 'Gays' }]
    }
  },
  methods: {
    async sendData () {
      let result = await PreferenceService.sendData(this.item, this.rating, this.gender, this.language, this.location, this.interests, 1)
      alert(result.data)
=======
      language: [{ text: 'English' }, { text: 'Xhosa' }, { text: 'Zulu' }, { text: 'Sotho' }, { text: 'Sepedi' }],
      results: [],
      city: ''
>>>>>>> 4a6f6d31ec41caf088dde985d1db72771d9b8fad
    }
  },
  mounted: {
    results: fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBlt9Sp7yGY_zrXiZx5NDQJS6lb17r4jco')
      .then(result => result.json()).then(result => {
        result.forEach(element => {
          this.results.push(element.address.country)
        })
      }, error => {
        alert(error.message)
      })
  }
}
</script>
