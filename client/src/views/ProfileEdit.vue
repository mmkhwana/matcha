<template>
  <v-card
    class="mx-auto my-12"
  >
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
       <v-row
          align="center"
          justify="center"
          class="d-flex flex-row mb-6"
       >
            <v-col
              v-for="n in pictures"
              :key="n"
              class="d-flex flex-column mb-6"
              cols="2"
            >
              <v-card>
                <v-img
                  :src='`http://localhost:5000/api/posts/uploads/${username}/${n}`'
                  :lazy-src='`http://localhost:5000/api/posts/uploads/${username}/${n}`'
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2"
                >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
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
                      v-model="address"
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
                    <v-text-field
                      v-model="country"
                      label="Country*"
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
                      v-model="state"
                      label="State/Province*"
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
        <v-col
        cols="10"
        class="text-right"
        >
        <v-dialog v-model="modal" hide-overlay transition="scroll-y-reverse-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
        <template>
        <div class="languages">
              <v-toolbar dark color="deep-purple lighten-3">
                <v-toolbar-title>Select Languages </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn icon dark @click="modal = false">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn icon dark @click="modal = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-row class="pa-12">
              <v-chip-group
              v-model="toLanguages"
              multiple
              >
              <v-col
                v-for='(item, index) in defaultLanguages'
                :key='index'
                class="shrink"
                ref="lang"
                cols="5"
              >
                <v-chip filter>{{ item }}</v-chip>
              </v-col>
              </v-chip-group>
              </v-row>
        </div>
        </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text full-width>
      <v-expansion-panels>
        <v-expansion-panel
        >
          <v-expansion-panel-header>Enter additional Language(s)</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-text-field
              v-model="lang"
              placeholder="type here..."
              @keyup.enter="addLanguage"
            ></v-text-field>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row>
      <v-col
        v-for='(item, index) in languages'
        :key='index'
        class="shrink"
      >
        <v-chip close filter outlined @click:close="close(index)">{{ item }}</v-chip>
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
        <v-col
        cols="10"
        class="text-right"
        >
        <v-dialog v-model="dialogBox" hide-overlay transition="scroll-y-reverse-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
              v-bind="attrs"
              v-on="on">
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
        <template>
        <div class="languages">
              <v-toolbar dark color="deep-purple lighten-3">
                <v-toolbar-title>Select Interest(s) </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn icon dark @click="getSelectedItem">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn icon dark @click="dialogBox = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-row class="pa-12">
              <v-chip-group
                v-model="toInterests"
                multiple
              >
              <v-col
                v-for='(item, index) in defaultInterests'
                :key='index'
                class="shrink"
                ref="lang"
                cols="2"
              >
                <v-chip filter>{{ item }}</v-chip>
              </v-col>
              </v-chip-group>
              </v-row>
        </div>
        </template>
        </v-dialog>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Enter additional interest(s)</v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-text-field
            placeholder="type here..."
            v-model="interest"
            @keyup.enter="addInterest"
          ></v-text-field>
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
        <v-chip close filter outlined @click:close="removeInterest(index)">{{ item }}</v-chip>
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
<style scoped>
 .languages
 {
   background: #fff;
   padding: 0;
   overflow: hidden;
 }
 .dialog-style
 {
   width: 400px;
 }
</style>
<script>
import edit from '../scripts/profile_edit_component'
export default edit
</script>
