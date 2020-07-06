<template>
    <v-card>
    <v-container id="dropdown-example-2">
    <v-row>
        <v-col cols="12" class="text-right">
            <v-btn icon v-on:click="edit">
                <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
        </v-col>
    </v-row>
    <gallery/>
    </v-container>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
    <v-row
    align="center"
    class="mx-0"
    >
    <v-col cols="12">
    <v-card flat>
                  <v-card-text>
               <v-container>
                  <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="street"
                      label="Street Address*"
                      :disabled="true"
                      prepend-icon="mdi-map-marker"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="postcode"
                      label="Post Code"
                      prepend-icon="mdi-numeric-4-box-multiple-outline"
                      :disabled="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="city"
                      label="City*"
                      prepend-icon="mdi-city"
                      :disabled="true"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="country"
                      label="Country*"
                      prepend-icon="mdi-flag-checkered"
                      :disabled="true"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="state"
                      label="State/Province/Region*"
                      prepend-icon="mdi-home-map-marker"
                      :disabled="true"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                  </v-col>
                </v-row>
               </v-container>
            </v-card-text>
    <v-card-title>Biography.</v-card-title>
    <v-card-subtitle>{{ biography }}</v-card-subtitle>
    <v-card-text>
    <v-row
    v-for="n in personality"
    :key="n.name"
    class="d-flex child-flex"
    cols="4"
    >
    <v-col cols="6" xs12 smd8 md4>
    <v-card-text>{{ n.name }}:</v-card-text>
    </v-col>
    <v-col cols="6">
    <v-card-text>{{ n.value }}</v-card-text>
    </v-col>
    </v-row>
    </v-card-text>
    </v-card>
    </v-col>
    </v-row>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-title>Languages</v-card-title>

    <v-card-text>
    <v-row>
      <v-col
        v-for='(item, index) in languages'
        :key='index'
        class="shrink"
      >
        <v-chip filter outlined >{{ item }}</v-chip>
      </v-col>
    </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Interests</v-card-title>

    <v-card-text>
    <v-row>
      <v-col
        v-for='(item, index) in interests'
        :key='index'
        class="shrink"
        ref="lang"
      >
        <v-chip filter outlined>{{ item }}</v-chip>
      </v-col>
    </v-row>
    </v-card-text>

    <v-card-actions>
    </v-card-actions>
    </v-card>
</template>
<style scoped src="../assets/css/profile.css" lang="css">
</style>
<script>
import profile from '../scripts/profile_component'
export default profile
</script>
