import GalleryService from '../services/GalleryService'
import Table from '../services/tables'
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
    let images = []
    const pics = await GalleryService.readImages(this.username, this.userid)
    images = pics.data
    images.forEach(row => {
      this.pictures.push({ id: row[Table.Images.id], name: row[Table.Images.name], role: row[Table.Images.role] })
    })
    this.$emit('imagesList', this.pictures)
    EventBus.$emit('profile', this.pictures[0].name)
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
    setProfile (picname, index) {
      try {
        EventBus.$emit('profile', picname)
        let oldId = this.pictures.filter(images => images.role === 'profile')
        oldId[0].role = 'none'
        this.pictures[index].role = 'profile'
        GalleryService.setProfilePic(oldId[0].id, this.pictures[index].id, this.userid)
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
