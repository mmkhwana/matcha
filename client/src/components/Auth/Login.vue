<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 >
                <v-form>
                    <v-card>
                        <v-toolbar
                            color="primary"
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
                            <v-btn rounded color ="indigo" dark>Sign Up</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn rounded color ="primary" dark>Login
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
    </v-container>
</template>
<script>
export default {
  name: 'Login'
}
</script>
