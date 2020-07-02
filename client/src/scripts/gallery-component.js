import GalleryService from '../services/GalleryService'
import EventBus from '../services/event_bus'
import VueSession from 'vue-session'
import Vue from 'vue'
Vue.use(VueSession)

export default {
  name: 'gallery',
  data: () => {
    return {
      icons: ['mdi-check', 'mdi-eye-circle', 'mdi-close'],
      pictures: [],
      username: '',
      userid: '',
      dialog: false,
      image: ''
    }
  },
  async mounted () {
    this.username = this.$session.get('username')
    this.userid = this.$session.get('userid')
    const pics = await GalleryService.readImages(this.username)
    this.pictures = pics.data
    this.$emit('imagesList', this.pictures)
  },
  methods: {
    removePicture (picname, index) {
      try {
        this.pictures.splice(index, 1)
        GalleryService.removeImage(picname, this.username, this.userid)
      } catch (err) {
        console.log(err)
      }
    },
    setProfile (picname) {
      try {
        EventBus.$emit('profile', picname)
      } catch (err) {
        console.log(err)
      }
    },
    previewImage (picname) {
      try {
        this.dialog = true
        this.image = 'http://localhost:5000/api/posts/uploads/' + this.username + '/' + picname
      } catch (err) {
        console.log(err)
      }
    }
  }
}
