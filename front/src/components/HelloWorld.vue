<template>
    <v-app>
        <div>
            <v-btn v-if="!$store.state.isUserLoggedin" color="warning" @click="socialLogin('google')"> Google 로 로그인 하기 </v-btn>
            <v-btn v-if="!$store.state.isUserLoggedin" color="primary" @click="socialLogin('facebook')"> Facebook 으로 로그인 하기 </v-btn>
            <v-btn v-if="$store.state.isUserLoggedin" color="error" @click="LogOut()"> LogOut 하기 </v-btn>
        </div>
  </v-app>
</template>
<script>
// import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      success: null,
      msg: null
    }
  },
  methods: {
    // social login
    async socialLogin (provider) {
      var this_ = this
      var data = null
      // request token 1 -> authentication code 서버로 전달 2
      await this_.$auth.authenticate(provider).then(function (authResponse) {
        if (provider === 'google') {
          console.log('google api called block')
        } else if (provider === 'facebook') {
          console.log('facebook api called block')
        }
        if (authResponse.data.success === true) {
          data = authResponse.data.user
        }
      })
      if (data !== null) {
        this.$store.dispatch('setUser', data)
        this.$store.dispatch('setToken', data.jwtToken)
      } else {
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setToken', null)
        this.$router.push('/')
      }
    },
    // LogOut method
    LogOut () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // redirect home page
      this.$router.push('/')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
