<template>
<v-container>
<v-parallax
  dark
  src="../assets/home.jpg"
  height= "1000"
  class="parrallax"
>
<v-row
  class="signup"
  justify="center"
>
  <v-flex xs12 sm8 md4 >
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Want to find your perfect date today?</h4>
    <v-btn v-on:click="Loginbtn" rounded color="deep-purple lighten-3" dark lg >Log in</v-btn>
  </v-flex>
  <v-flex xs8 sm8 md4 >
      <v-card>
          <v-card-text >{{ response }}</v-card-text>
              <v-card-text>
                <v-alert-box>
                  <p>{{ error }}</p>
                </v-alert-box>
                  <v-form  >
                      <!-- <v-alert
                          :value="true"
                          color="error"
                          icon="warning"
                      >
                      This user already exist, try a different set of data.
                      </v-alert> -->
                  <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="firstname"
                      label="First name"
                      required
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
                    ></v-text-field>
                  </v-col>
                </v-row>
                      <v-text-field
                          icon="person"
                          name="username"
                          label="Username"
                          type="text"
                          v-model="username"
                      >
                      </v-text-field>
                      <v-text-field
                          name="user_email"
                          label="Email"
                          type="text"
                          v-model="email"
                      >
                      </v-text-field>
                      <v-dialog
                              ref="dialog"
                              v-model="modal"
                              :return-value.sync="date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date"
                                  label="Date of Birth"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" type="month" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
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
                          <v-btn rounded color="deep-purple lighten-3" dark v-on:click="insertUser">Register</v-btn>
                      </v-card-actions>
                  </v-form>
              </v-card-text>
          </v-card>
  </v-flex>
</v-row>

</v-parallax>
<v-card height="auto">
  <v-footer
    dark
    :padless="true"
    absolute
  >
    <v-card
      width="100%"
      flat
      tile
      class="deep-purple lighten-3 white--text text-center"
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
 Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Matcha</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-card>
</v-container>
</template>
<style scoped>
</style>
<script>
import signup from '../scripts/signup_component.js'
export default signup
</script>
