<template>
    <layout cols="12" sm="12">
    <v-card
      persistent
      max-width="500px"
      transition="dialog-bottom-transition"
    >
      <v-card  cols="12" sm="12">
        <v-card-title class="headline">Choose Photo</v-card-title>
      <v-card-text>
                <v-img
                  :src= image
                  :lazy-src="image"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2"
                ></v-img>
      </v-card-text>
        <v-card-text>
          <input
              accept="image/*"
              color="primary"
              type="file"
              name="upload"
              @change="changed"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="purple darken-1"
            text
            @click="cancel"
          >
            cancel
          </v-btn>

          <v-btn
            color="purple darken-1"
            text
            @click="save"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
    </layout>
</template>
<script>
export default {
  name: 'Dialog',
  default () {
    return {
      file: null,
      image: `https://picsum.photos/500/300?image=${1 * 5 + 10}`
    }
  },
  methods: {
    changed (e) {
      this.file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.onload = (event) => {
        this.image = event.target.result
      }
      e.target.files[0] = null
    },
    cancel () {
      this.$root.$emit('Edit')
    },
    save () {
      alert(this.file)
      this.$root.$emit('Edit')
    }
  }
}
</script>
