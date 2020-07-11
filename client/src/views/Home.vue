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
    <v-btn v-on:click="Loginbtn" rounded color="pink accent-4" dark lg >Log in</v-btn>
  </v-flex>
  <v-flex xs8 sm8 md4 >
      <v-card>
              <v-card-text>
                <div v-if="error" class="alert">
                  <p>{{ error }}</p>
                </div>
                  <v-form  >
                  <v-row>
                    <v-container elevation="6">
                      <v-overflow-btn
                      v-model="gender"
                      :items="gender_type"
                      label="Select Gender"
                      required
                      >
                      <v-div></v-div>
                      </v-overflow-btn>
                    </v-container>
                  </v-row>
                  <v-row>
                    <v-container elevation="6">
                      <v-overflow-btn
                      v-model="race_item"
                      :items="race"
                      label="Select Race"
                      required
                      >
                      <v-div></v-div>
                      </v-overflow-btn>
                    </v-container>
                  </v-row>
                  <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="firstname"
                      label="First name"
                      required
                      class="dotted-line"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="lastname"
                      label="Last name"
                      required
                      class="dotted-line"
                    ></v-text-field>
                  </v-col>
                </v-row>
                      <v-text-field
                          icon="person"
                          name="username"
                          label="Username"
                          type="text"
                          v-model="username"
                          prepend-icon="mdi-account"
                          class="dotted-line"
                      >
                      </v-text-field>
                      <v-text-field
                          name="user_email"
                          label="Email"
                          type="text"
                          v-model="email"
                          prepend-icon="mdi-email"
                          class="dotted-line"
                      >
                      </v-text-field>
                      <v-dialog
                              ref="dialog"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  prepend-icon=" mdi-calendar-month"
                                  v-model="date"
                                  label="Date of Birth"
                                  readonly
                                  v-on="on"
                                  class="dotted-line"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" type="month" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                      <v-text-field
                          prepend-icon="mdi-lock"
                          name="user_pwd"
                          label="Password"
                          type="password"
                          v-model="pass"
                          class="dotted-line"
                      >
                      </v-text-field>
                      <v-text-field
                          prepend-icon="mdi-lock"
                          name="user_confpwd"
                          label="Confirm Password"
                          type="password"
                          v-model="confirm"
                          class="dotted-line"
                      >
                      </v-text-field>
                  </v-form>
                    <v-card-actions align="center" justify="center" class="btn-position">
                      <v-btn class="btn-align" rounded dark v-on:click="insertUser" v-if="!progress">Register</v-btn>
                      <v-progress-circular class="btn-align" indeterminate color="green" v-else>
                      </v-progress-circular>
                    </v-card-actions>
              </v-card-text>
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
<style src="../assets/css/signup.css" lang="css">
</style>
<script>
import signup from '../scripts/signup_component.js'
export default signup
</script>
