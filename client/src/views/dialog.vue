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
  mounted: () => {
    this.$refs['photo'].src = '../../assets/logo.png'
  },
  methods: {
    changed (e) {
      this.file = e.target.files[0]
      var reader = new FileReader()
      reader.addEventListener('load', () => {
        this.$refs.photo.src = reader.result
      })
      reader.readAsDataURL(this.file)
    },
    cancel () {
      this.$root.$emit('Edit')
      this.$destroy()
    },
    async save () {
      alert(this.$refs.photo.src)
      var fileform = new FormData()
      fileform.append('file', this.file, this.file.name)
      var res = await GeneralService.UploadPhoto(fileform)
      alert(res.success)
      this.$root.$emit('Edit')
      this.$destroy()
    }
  }
}
</script>
