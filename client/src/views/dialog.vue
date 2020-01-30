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
                  :src="img"
                  width="450px"
                  height="350px"
                  rel="photo"
                ></v-img>
      </v-card-text>
        <v-card-text>
          <input
              accept="image/*"
              color="primary"
              type="file"
              rel="upload"
              @change= "changed"
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
import GeneralService from '../GeneralService'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)
export default {
  name: 'Dialog',
  default () {
    return {
      file: null,
      img: '../assets/logo.png'
    }
  },
  methods: {
    changed (e) {
      this.file = e.target.files[0]
      this.img = URL.createObjectURL(this.file)
      var reader = new FileReader()
      reader.readAsDataURL(this.file)
      reader.addEventListener('load', () => {
        this.img = reader.result
      })
    },
    cancel () {
      this.$root.$emit('Edit')
      this.$destroy()
    },
    async save () {
      alert(this.img)
      var res = await GeneralService.UploadPhoto(this.img)
      alert(res.success)
      this.$root.$emit('Edit')
      this.$destroy()
    }
  }
}
</script>
