<template>
<div class="parent-container">
    <v-parallax
    src="../assets/first.jpg"
    height="1100"
    class="parallax"
    breakpoint="(min-width: 80px)"
    >
    <v-row
    class="signup"
    justify="center"
    >
    <v-flex xs12 sm8 md4 >
        <h1 class="text-color display-3 mb-4">Welcome to Matcha</h1>
        <h4 class="text-color subheading font-weight-thin display-2">Meet Your Match!</h4>
        <v-btn v-on:click="register" rounded color="pink accent-4"  dark lg >Want to register?</v-btn>
    </v-flex>
    <v-flex xs8 sm8 md4 >
        <v-card>
            <div v-if="error" class="alert">
                <p>{{ error }}</p>
            </div>
            <v-card-text>
                <v-form>
                    <v-container>
                    <v-row>
                        <v-text-field
                            icon="person"
                            name="username"
                            label="Username"
                            type="text"
                            required
                            v-model="username"
                            prepend-icon="mdi-account"
                            class="dotted-line"
                        >
                        </v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            name="user_pwd"
                            label="Password"
                            type="password"
                            required
                            v-model="pass"
                            prepend-icon="mdi-lock"
                            class="dotted-line"
                        >
                        </v-text-field>
                    </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-container>
                <v-card-actions justify="center">
                    <v-btn class="btn-align" rounded  dark v-on:click="login" v-if="!progress">Log In
                    </v-btn>
                    <v-progress-circular class="btn-align" indeterminate color="green" v-else>
                    </v-progress-circular>
                </v-card-actions>
                <v-card-actions>
                    <a href ="#" class="btn-align">Forget Password?</a>
                </v-card-actions>
            </v-container>
        </v-card>
    </v-flex>
    </v-row>
    </v-parallax>
  <v-card height="auto" class="footer">
  <v-footer
    dark
    :padless="true"
    absolute
  >
    <v-card
      width="100%"
      flat
      tile
      class="lighten-3 white--text text-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="white--text pt-0">
This site is built to allow two potential lovers to meet. No bullshit.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Matcha</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-card>
</div>
</template>
<style scoped src="../assets/css/signup.css" lang="css">
</style>
<script>
import login from '../scripts/login_component'
export default login
</script>
