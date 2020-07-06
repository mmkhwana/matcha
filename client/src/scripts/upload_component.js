import UserProfileService from '../services/UserProfileService'
import EventBus from '../services/event_bus'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)
export default {
  name: 'Dialog',
  default () {
    return {
      file: null,
      img: '',
      progress: false
    }
  },
  computed: {
    getImage () {
      return this.img
    }
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
      this.progress = true
      var fileform = new FormData()
      fileform.append('userid', this.$session.get('userid'))
      fileform.append('file', this.file, this.file.name)
      fileform.append('username', this.$session.get('username'))
      var res = await UserProfileService.uploadImage(fileform)
      if (res.success) {
        EventBus.$emit('sendText', 'Image Uploaded Successfully')
      }
      this.progress = false
      this.$root.$emit('Edit')
      this.$destroy()
    }
  }
}
