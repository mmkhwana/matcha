<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4 >
                <v-card class="elevation-12">
                    <v-toolbar
                        color="primary"
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
                                >
                                </v-text-field>
                                <v-text-field
                                    icon="email"
                                    name="user_email"
                                    label="Email"
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
                                <v-text-field
                                    icon="lock"
                                    name="user_confpwd"
                                    label="Confirm Password"
                                    type="password"
                                >
                                </v-text-field>
                                <v-card-actions>
                                    <v-btn rounded color ="indigo" dark>Sign Up</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>
                    </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  name: 'Signup'
}
</script>
