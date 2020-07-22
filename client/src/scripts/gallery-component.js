import GalleryService from '../services/GalleryService'
import Constant from '../services/constants'
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
    if (pics.data !== 'nopics') {
      images = pics.data
      images.forEach(row => {
        this.pictures.push({ id: row[Table.Images.id], name: row[Table.Images.name], role: row[Table.Images.role] })
      })
      this.$emit(Constant.ImageList, this.pictures)
      EventBus.$emit(Constant.Profile, this.pictures[0].name)
      this.$session.set('profile', 'set')
    } else {
      this.$session.set('profile', 'notset')
    }
  },
  methods: {
    removePicture (picname, index) {
      if (this.pictures.length === 0) {
        this.$session.set('profile', 'notset')
      }
      try {
        this.pictures.splice(index, 1)
        GalleryService.removeImage(picname, this.username, this.userid)
      } catch (err) {
        console.log(err)
      }
    },
    setProfile (picname, index) {
      try {
        EventBus.$emit(Constant.Profile, picname)
        let results = this.pictures.filter(images => images.role === Constant.Profile)
        if (!results[0]) {
          this.pictures[index].role = Constant.Profile
          GalleryService.setProfile(this.pictures[index].id)
        } else {
          let oldId = this.pictures.filter(images => images.role === Constant.Profile)
          let indexOld = this.pictures.indexOf(oldId[0])
          this.pictures[indexOld].role = Constant.NotProfile
          this.pictures[index].role = Constant.Profile
          GalleryService.setProfilePic(this.pictures[indexOld].id, this.pictures[index].id, this.userid)
        }
      } catch (err) {
        console.log(err)
      }
    },
    previewImage (picname) {
      try {
        this.dialog = true
        this.image = Constant.URL + Constant.Uploads + '/' + this.username + '/' + picname
      } catch (err) {
        console.log(err)
      }
    }
  }
}
