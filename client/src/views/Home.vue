<template>
<v-parallax dark src="../assets/home.jpg">
<v-row
  align="center"
  justify="center"
>
  <v-col class="text-center" cols="12">
    <h1 class="display-1 font-weight-thin mb-4">Welcome to Matcha</h1>
    <h4 class="subheading">Want to find your perfect date today!</h4>
    <v-btn rounded dark lg>Login</v-btn>
    <v-btn rounded dark lg>Register</v-btn>
  </v-col>
</v-row>
</v-parallax>
<v-card>
<h4 class="subheading">Want to find your perfect date today!</h4>
</v-card>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'home',
  components: {
  }
}
</script>
