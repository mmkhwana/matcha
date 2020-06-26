import GeneralService from '../services/GeneralService'
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
    this.$refs.photo.src = '../assets/logo.png'
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
      fileform.append('userid', 1)
      var res = await GeneralService.UploadPhoto(fileform)
      alert(res.success)
      this.$root.$emit('Edit')
      this.$destroy()
    }
  }
}
