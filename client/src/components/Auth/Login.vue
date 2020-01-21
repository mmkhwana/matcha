<template>
<v-parallax
  src="../../assets/home.jpg"
  height= "1100"
>
<v-row
  align="center"
  justify="center"
>
<v-col class="text-center" cols="12">
    <h1 class="display-3 mb-4">Welcome to Matcha</h1>
    <h4 class="subheading font-weight-thin display-1">Meet Your Match!</h4>
  </v-col>
  <v-col class="text-center" cols="12">
    <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 >
                <v-form>
                    <v-card>
                        <v-toolbar
                            color="deep-purple lighten-3"
                            dark
                        >
                            <v-toolbar-title>
                                Login Form
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                icon="person"
                                name="username"
                                label="Username"
                                type="text"
                            >
                            </v-text-field>
                            <v-text-field
                                icon="lock"
                                name="user_pwd"
                                label="Password"
                                type="password"
                            >
                            </v-text-field>
                        </v-card-text>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-btn rounded color="deep-purple lighten-3" dark>Login
                            </v-btn>
                        </v-card-actions>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <a href ="#">Forget Password?</a>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-flex>
        </v-layout>
  </v-col>
</v-row>
</v-parallax>

</template>
<script>
export default {
  name: 'Login'
}
</script>
