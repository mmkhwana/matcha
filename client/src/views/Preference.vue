<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
  >

    <v-card-title>Khanyisa</v-card-title>
     <v-container id="dropdown-example-2">
        <v-overflow-btn
        class="my-2"
        :items="dropdown_icon"
        label="Age preference"
        segmented
        target="#dropdown-example-2"
        ></v-overflow-btn>
    </v-container>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      <v-card-title>Profile Rating</v-card-title>
        <v-rating
          :value="2.5"
          dense
          half-increments
          readonly
          size="14"
          background-color="purple lighten-3"
          color="purple"
        ></v-rating>

        <div class="grey--text ml-3">2.5 (413)</div>
      </v-row>
    </v-card-text>
    <v-container id="dropdown-example-2">
        <v-overflow-btn
        class="my-2"
        :items="dropdown_icon"
        label="Location preference"
        segmented
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
  default () {
    return { dropdown_icon: ['18-21', '22-25', '26-29', '30-33', '34-37'] }
  }
}
</script>
