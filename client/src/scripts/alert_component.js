import EventBus from '../services/event_bus'

export default {
  name: 'alert',
  data () {
    return {
      message: '',
      timer: ''
    }
  },
  mounted () {
    EventBus.$on('sendText', (message) => {
      this.message = message
      this.timer = setInterval(this.clearMessage, 3000)
    })
  },
  methods: {
    clearMessage () {
      this.message = ''
      clearInterval(this.timer)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
