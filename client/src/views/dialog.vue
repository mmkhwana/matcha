<template>
    <layout cols="12" sm="12">
    <v-card
      persistent
      max-width="500px"
      transition="dialog-bottom-transition"
    >
      <v-card  cols="12">
        <v-card-title class="headline">Choose Photo</v-card-title>
      <v-card-text>
                <v-img
                  v-bind:src="img"
                  width="450px"
                  height="350px"
                  ref="photo"
                ></v-img>
      </v-card-text>
        <v-card-text>
          <input
              accept="image/*"
              color="primary"
              type="file"
              ref="upload"
              @change="changed"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            rounded outlined color="error"
            @click="cancel"
          >
            cancel
          </v-btn>

          <v-btn
            rounded outlined color="success"
            @click="save"
            v-if="!progress"
          >
            save
          </v-btn>
          <v-progress-circular indeterminate color="green" v-else>
          </v-progress-circular>
        </v-card-actions>
      </v-card>
    </v-card>
    </layout>
</template>
<script>
import upload from '../scripts/upload_component'
export default upload
</script>
