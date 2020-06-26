<template>
<v-container>
<v-parallax
  src="../../assets/home.jpg"
  height= "1000"
>
<v-row
  class="signup"
  justify="center"
>
  <v-flex xs12 sm8 md4 >
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Meet Your Match!</h4>
     <v-btn v-on:click="register" rounded color="deep-purple lighten-3" dark lg >Want to register?</v-btn>
  </v-flex>
  <div
  v-for="(user, index) in users"
  v-bind:index="index"
  v-bind:item="user"
  v-bind:key="user._id"
  >
  <p>{{ user.email }} Khanyisa Mbukutshe</p>
  </div>
  <v-flex xs8 sm8 md4 >
      <v-form>
          <v-card>
              <v-card-text>
                  <v-text-field
                      icon="person"
                      name="username"
                      label="Username"
                      type="text"
                      v-model="username"
                  >
                  </v-text-field>
                  <v-text-field
                      icon="lock"
                      name="user_pwd"
                      label="Password"
                      type="password"
                      v-model="pass"
                  >
                  </v-text-field>
              </v-card-text>
              <v-card-actions>
                  <v-btn rounded color="deep-purple lighten-3 " dark v-on:click="login">Log In
                  </v-btn>
              </v-card-actions>
              <v-card-actions>
                  <a href ="#">Forget Password?</a>
              </v-card-actions>
          </v-card>
      </v-form>
  </v-flex>
</v-row>
</v-parallax>
</v-container>
</template>
<style src="../../assets/css/signup.css" lang="css">
</style>
<script>
import login from '../../scripts/login_component'
export default login
</script>
