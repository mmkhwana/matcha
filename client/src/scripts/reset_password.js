import axios from 'axios'
import General from '../services/GeneralService'
import router from '../router'

export default {
  name: 'reset',
  data () {
    return {
      email: ''

    }
  },

  methods: {
    Loginbtn () {
      router.push({ name: 'Login' })
    },
    Registerbtn () {
      router.push({ name: '/' })
    },
    async reset_password () {
      await General.getReturnArrayExecution('account/send_verification', { email: this.email })
    },
    sendEmail () {
      axios
        .post(
          'http://localhost:5000/api/account/send_verification',
          {
            password: this.password,
            newPassword: this.newPassword
          }
        )
        .then(response => {
          this.password = this.newPassword = this.confirmPassword = ''
          alert('success')
        })
    }
  }
}
