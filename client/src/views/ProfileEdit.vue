<template>
  <v-card
    class="mx-auto my-12"
  >
     <v-container id="dropdown-example-2">
       <v-row>
        <v-col cols="2"
          class="d-xs-flex"
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
          <v-col cols="10" class="text-right">
            <v-btn rounded outlined color="success">
              <v-icon left>mdi-check</v-icon>save
            </v-btn>
          </v-col>
      </v-row>
       <v-row
       justify="space-around"
       >
            <v-col
              v-for="n in pictures"
              :key="n"
              class="d-xs-inline-flex"
              cols="3"
            >
              <v-card>
                <v-img
                  :src='`http://localhost:5000/api/posts/uploads/${n}`'
                  :lazy-src='`http://localhost:5000/api/posts/uploads/${n}`'
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="fill-height white--text align-end grey lighten-2"
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
                      <v-text-field
                      v-model="item.value"
                      ></v-text-field>
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
import UserProfileService from '../services/UserProfileService'
import Table from '../services/tables'
import Constant from '../services/constants'
import Interests from '../jsons/interests'
import Languages from '../jsons/languages'

export default {
  name: 'Profile Edit',
  data () {
    return {
      pictures: [],
      selection: [],
      languages: [],
      interests: [],
      defaultInterests: [],
      defaultLanguages: [],
      toInterest: [],
      toLanguages: [],
      firstname: '',
      lastname: '',
      biography: '',
      items: [
        { name: Constant.relationship, value: '' },
        { name: Constant.height, value: '' },
        { name: Constant.age, value: '' },
        { name: Constant.race, value: '' },
        { name: Constant.hair, value: '' }
      ],
      profileObj: [],
      success: '',
      dialog: false,
      loading: false,
      modal: false,
      dialogBox: false
    }
  },
  props: {
    lang: { type: String },
    interest: { type: String }
  },
  async mounted () {
    this.$root.$on('Edit', () => {
      this.titles = 'Edit'
    })
    this.defaultInterests = Interests
    this.defaultLanguages = Languages
    const pics = await UserProfileService.readImages()
    this.pictures = pics.data
    const res = (await UserProfileService.getUserDetails(1))[0]
    let output = await UserProfileService.getInterest(1)
    let lang = await UserProfileService.getLanguage(1)
    this.firstname = res[Table.User.firstName]
    this.lastname = res[Table.User.lastName]
    this.biography = res[Table.User.biography]
    this.items[0].value = res[Table.User.status]
    this.items[1].value = res[Table.User.height] + 'm'
    this.items[2].value = res[Table.User.age] + 'yrs'
    this.items[3].value = res[Table.User.race]
    this.items[4].value = res[Table.User.hair]
    lang.forEach(lang => {
      this.languages.push(lang[Table.Languages.name])
    })
    output.forEach(interest => {
      this.interests.push(interest[Table.Interests.name])
    })
  },
  methods: {
    async updateProfile () {
      this.dialog = true
      try {
        let results = await UserProfileService.updateProfile(this.firstname, this.lastname,
          this.biography, this.items[0].value, this.items[1].value, this.items[2].value, this.items[3].value,
          this.items[4].value, 1, this.languages, this.interests)
        await UserProfileService.insertInterest(this.interests, 1)
        await UserProfileService.insertLanguage(this.languages, 1)
        this.success = results
        this.dialog = false
      } catch (error) {
        console.log(error)
      }
    },
    close (index) {
      this.languages.splice(index, 1)
    },
    removeInterest (index) {
      this.interests.splice(index, 1)
    },
    addLanguage () {
      let res = this.languages.filter(lang => lang === this.lang)
      if (this.lang && (res !== this.lang)) {
        this.languages.push(this.lang)
        this.lang = ''
      }
    },
    addInterest () {
      let res = this.interests.filter(interest => interest === this.interest)
      if (this.interest && (res !== this.interest)) {
        this.interests.push(this.interest)
        this.interest = ''
      }
    },
    getSelectedItem () {
      this.dialogBox = false
      alert(JSON.stringify(this.toInterest))
    },
    addOject (key, value) {
      this.$set(this.profileObj, key, value)
    },
    upload () {
      this.$root.$emit('Upload')
      this.$destroy()
    }
  }
}
</script>
