<template>
<v-parallax
  src="../assets/home.jpg"
  height= "1000"
>
<v-row
  align="center"
  justify="center"
>
  <v-col class="text-center" cols="12">
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Want to find your perfect date today!</h4>
    <v-btn rounded dark lg >Login</v-btn>
  </v-col>
  <v-col class="text-center" cols="12">
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 >
            <v-card class="elevation-12">
                <v-toolbar
                    color="deep-purple lighten-3"
                    dark
                >
                    <v-toolbar-title>
                        SignUp Form
                    </v-toolbar-title>
                </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <!-- <v-alert
                                :value="true"
                                color="error"
                                icon="warning"
                            >
                            This user already exist, try a different set of data.
                            </v-alert> -->
                            <v-text-field
                                icon="person"
                                name="username"
                                label="Username"
                                type="text"
                                v-model="text"
                            >
                            </v-text-field>
                            <v-text-field
                                icon="email"
                                name="user_email"
                                label="Email"
                                type="text"
                                v-model="email"
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
                            <v-text-field
                                icon="lock"
                                name="user_confpwd"
                                label="Confirm Password"
                                type="password"
                                v-model="confirm"
                            >
                            </v-text-field>
                            <v-card-actions>
                                <v-btn rounded color="deep-purple lighten-3" dark v-on:click="insertUser">Sign Up</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card-text>
                </v-card>
        </v-flex>
    </v-layout>
  </v-col>
</v-row>
</v-parallax>
<<<<<<< HEAD
=======

>>>>>>> refs/remotes/origin/wiseman
</template>
<script>
// @ is an alias to /src

import router from '../router'

export default {
  name: 'home',
  methods: {
    navigate () {
      router.push({ name: 'Dashboard' })
    }
  }
}
</script>
