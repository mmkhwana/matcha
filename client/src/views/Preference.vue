<template>
  <v-card
    class="mx-auto my-12"
  >
     <v-container id="dropdown-example-1">
        <v-overflow-btn
        v-model="item"
        :items="dropdown_icon"
        label="Age preference"
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
        <v-overflow-btn
        class="my-2"
        v-model="location"
        :items="results"
        label="Location preference"
        overflow
        target="#dropdown-example-2"
        ></v-overflow-btn>
    </v-container>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Interest</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>Going out</v-chip>

        <v-chip>Drinking</v-chip>

        <v-chip>Smoking</v-chip>

        <v-chip>Tattoos</v-chip>

        <v-chip>Some Nice honeys</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'Preference',
  data: function () {
    return {
      rating: '0.5',
      item: 'Age preference',
      location: 'Location preference',
      dropdown_icon: [{ text: '18-21' }, { text: '22-25' }, { text: '26-29' }, { text: '30-33' }, { text: '34-37' }],
      language: [{ text: 'English' }, { text: 'Xhosa' }, { text: 'Zulu' }, { text: 'Sotho' }, { text: 'Sepedi' }],
      results: [],
      city: ''
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
