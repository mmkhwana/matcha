<template>
  <v-card>
     <v-container id="dropdown-example-2">
       <v-row>
        <v-col cols="6"
          class="text-left"
          color="deep-purple lighten-3"
          dark
          >
              <v-container class="text-center">
              <template>
                  <v-btn icon @click="upload">
                    <v-icon>mdi-camera-plus</v-icon>
                  </v-btn>
                  <v-card-text>Upload Photo</v-card-text>
              </template>
              </v-container>
            </v-col>
          <v-col cols="6" class="text-right">
            <v-btn rounded outlined color="success">
              <v-icon left>mdi-check</v-icon>save
            </v-btn>
          </v-col>
      </v-row>
      <gallery @imagesList="updatePictures"/>
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
                        v-model="firstname"
                        label="First name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      md="4"
                    >
                      <v-text-field
                        v-model="lastname"
                        label="Last name"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="street"
                      label="Address*"
                      prepend-icon="mdi-map-marker"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-text-field
                      v-model="postcode"
                      label="Post Code"
                      type="number"
                      required
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
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4"
                  >
                    <v-autocomplete
                      v-model="country"
                      :items="countries"
                      label="Country*"
                      placeholder="Select..."
                      required
                    ></v-autocomplete>
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
                      required
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
              <v-card-title>Biography</v-card-title>
              <v-card-subtitle>
                <v-textarea
                clearable
                v-model="biography"
                label="Bio(optional)."
                ></v-textarea>
              </v-card-subtitle>
              <v-card-text>
                <v-row
                    v-for="item in items"
                    v-bind:key="item.name"
                    class="d-flex child-flex"
                    cols="4"
                >
                    <v-col cols="3">
                      <v-card-text>{{ item.name }}</v-card-text>
                    </v-col>
                    <v-col cols="2">
                      <v-card-text>:</v-card-text>
                    </v-col>
                    <v-col cols="6">
                      <div v-if="item.name === 'Height'">
                        <v-text-field
                          v-model="item.value"
                          type="number"
                          hint="height(m)"
                        ></v-text-field>
                      </div>
                      <div v-else-if="item.name === 'Age'">
                        <v-text-field
                          v-model="item.value"
                          type="number"
                          hint="age(yrs)"
                        ></v-text-field>
                      </div>
                      <div v-else-if="item.name === 'Race'">
                          <v-autocomplete
                            v-model="item.value"
                            :items="race"
                            placeholder="Select..."
                            required
                          ></v-autocomplete>
                      </div>
                      <div v-else-if="item.name === 'Relationship'">
                          <v-autocomplete
                            v-model="item.value"
                            :items="relations"
                            placeholder="Select..."
                            required
                          ></v-autocomplete>
                      </div>
                      <div v-else>
                        <v-text-field
                          v-model="item.value"
                        ></v-text-field>
                      </div>
                    </v-col>
                </v-row>
              </v-card-text>
          </v-card>
      </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-title>
      <v-row>
        <v-col
        cols="2"
        >
        Languages
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text full-width>
      <v-expansion-panels>
        <v-expansion-panel
        >
          <v-expansion-panel-header>Enter additional Language(s)</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
              v-model="lang"
              :items="defaultLanguages"
              placeholder="Select..."
              @keyup.enter="addLanguage"
              required
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row>
      <v-col
        v-for='(item, index) in languages'
        :key='index'
        class="shrink"
      >
        <v-chip close filter outlined @click:close="removeLanguage(index, item)">{{ item }}</v-chip>
      </v-col>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>
      <v-row>
        <v-col
        cols="2"
        >
        Interests
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Enter additional interest(s)</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-autocomplete
              v-model="interest"
              :items="defaultInterests"
              placeholder="Select..."
              @keyup.enter="addInterest"
              required
            ></v-autocomplete>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row>
      <v-col
        v-for='(item, index) in interests'
        :key='index'
        class="shrink"
        ref="lang"
      >
        <v-chip close filter outlined @click:close="removeInterest(index, item)">{{ item }}</v-chip>
      </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
            <v-row>
          <v-col cols="12" class="text-right">
            <v-btn rounded outlined color="success" :disabled="loading" :loading="loading" v-on:click="updateProfile">
              <v-icon left>mdi-check</v-icon>save
            </v-btn>
          </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<style scoped src="../assets/css/profile.css" lang="css">
</style>
<script>
import edit from '../scripts/profile_edit_component'
export default edit
</script>
