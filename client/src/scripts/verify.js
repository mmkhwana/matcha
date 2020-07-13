import General from '../services/GeneralService'
import router from '../router'
export default {
  name: 'verify',
  methods: {
    async verify () {
      try {
        let token = this.$route.params.token
        let email = this.$route.params.email
        await General.PostExecution('verify', { token, email })
        router.push({ name: 'Login' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
