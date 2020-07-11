<template>
<div class="parent-container">
<v-parallax
  dark
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
    <h4 class="text-color subheading font-weight-thin display-2">Want to find your perfect date today?</h4>
    <v-btn v-on:click="verify" rounded color="pink accent-4" dark lg >Verify Your Account</v-btn>
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
<style src="../assets/css/signup.css" lang="css">
</style>
<script>
import verify from '../scripts/verify'
export default verify
</script>
