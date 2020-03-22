<template>

  <v-card
    class="mx-auto my-12"
  >
     <v-container id="dropdown-example-2">
       <v-row>
          <v-col cols="12" class="text-right">
            <v-btn rounded outlined color="success">
              <v-icon left>mdi-check</v-icon>save
            </v-btn>
          </v-col>
      </v-row>
       <v-row>
          <v-col cols="2"
          class="d-flex child-flex"
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
            <v-col
              v-for="n in pictures"
              :key="n"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card>
                <v-img
                  :src='`http://localhost:5000/api/posts/uploads/${n}`'
                  :lazy-src='`http://localhost:5000/api/posts/uploads/${n}`'
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
                      v-model="interests[Relationship]"
                      ></v-text-field>
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
      <v-chip-group
        v-model="languages"
        column
        multiple
      >
        <v-chip filter outlined>isiZulu</v-chip>

        <v-chip filter outlined>English</v-chip>

        <v-chip filter outlined>Afrikaans</v-chip>

        <v-chip filter outlined>isiXhosa</v-chip>

        <v-chip filter outlined>Tshwana</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Interests</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        column
        multiple
      >

        <v-chip filter outlined>Going out</v-chip>

        <v-chip filter outlined>Drinking</v-chip>

        <v-chip filter outlined>Smoking</v-chip>

        <v-chip filter outlined>Tattoos</v-chip>

        <v-chip filter outlined>Some Nice honeys</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
             <v-row>
          <v-col cols="12" class="text-right">
            <v-btn rounded outlined color="success" v-on:click="getSelectedItem">
              <v-icon left>mdi-check</v-icon>save
            </v-btn>
          </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
import UserProfileService from '../UserProfileService'

export default {
  name: 'Profile Edit',
  data () {
    return {
      pictures: [],
      selection: [],
      languages: [],
      biography: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      interests: [{ 'Relationship': 'complicated' }, { 'Height': '1.5m' }, { 'Age': '18yrs' }, { 'Race': 'Black' }, { 'Hair': 'Curly Blackish' }],
      items: [{ name: 'Relationship' }, { name: 'Height' }, { name: 'Age' }, { name: 'Race' }, { name: 'Hair' }],
      profileObj: [],
      relation: '',
      height: '',
      age: '',
      hair: ''
    }
  },
  async mounted () {
    this.$root.$on('Edit', () => {
      this.titles = 'Edit'
    })
    const pics = await UserProfileService.readImages()
    this.pictures = pics.data
  },
  methods: {
    async updateProfile () {
      try {
        let results = await UserProfileService.updateProfile(this.biography, this.relation, this.height, this.age, this.hair, this.languages, this.interests)
        alert(results)
      } catch (error) {
        console.log(error)
      }
    },
    getSelectedItem () {
      alert(JSON.stringify(this.selection))
    },
    addOject (key, value) {
      this.$set(this.profileObj, key, value)
    },
    upload () {
      this.$root.$emit('Upload')
      this.$destroy()
    },
    Going_out () {
      if ((this.$refs.out).color === 'green') {
        (this.$refs.out).color = 'lightGrey';
        (this.$refs.out).textColor = 'black'
      } else {
        (this.$refs.out).color = 'green';
        (this.$refs.out).textColor = 'white'
        this.interests.push('Going Out')
      }
    },
    Drinking () {
      if ((this.$refs.Drink).color === 'green') {
        (this.$refs.Drink).color = 'LightGrey';
        (this.$refs.Drink).textColor = 'black'
        this.interests.add('Drink')
      } else {
        (this.$refs.Drink).color = 'green';
        (this.$refs.Drink).textColor = 'white'
      }
    },
    Smoking () {
      if ((this.$refs.Smoking).color === 'green') {
        (this.$refs.Smoking).color = 'LightGrey';
        (this.$refs.Smoking).textColor = 'black'
      } else {
        (this.$refs.Smoking).color = 'green';
        (this.$refs.Smoking).textColor = 'white'
      }
    },
    Tattoos () {
      if ((this.$refs.Tattoos).color === 'green') {
        (this.$refs.Tattoos).color = 'LightGrey';
        (this.$refs.Tattoos).textColor = 'black'
      } else {
        (this.$refs.Tattoos).color = 'green';
        (this.$refs.Tattoos).textColor = 'white'
      }
    },
    Some () {
      if ((this.$refs.Some).color === 'green') {
        (this.$refs.Some).color = 'LightGrey';
        (this.$refs.Some).textColor = 'black'
      } else {
        (this.$refs.Some).color = 'green';
        (this.$refs.Some).textColor = 'white'
      }
    },
    Zulu () {
      if ((this.$refs.Zulu).color === 'green') {
        (this.$refs.Zulu).color = 'lightGrey';
        (this.$refs.Zulu).textColor = 'black'
      } else {
        (this.$refs.Zulu).color = 'green';
        (this.$refs.Zulu).textColor = 'white'
      }
    },
    English () {
      if ((this.$refs.English).color === 'green') {
        (this.$refs.English).color = 'lightGrey';
        (this.$refs.English).textColor = 'black'
      } else {
        (this.$refs.English).color = 'green';
        (this.$refs.English).textColor = 'white'
      }
    },
    Afrikaans () {
      if ((this.$refs.Afrikaans).color === 'green') {
        (this.$refs.Afrikaans).color = 'lightGrey';
        (this.$refs.Afrikaans).textColor = 'black'
      } else {
        (this.$refs.Afrikaans).color = 'green';
        (this.$refs.Afrikaans).textColor = 'white'
      }
    },
    Xhosa () {
      if ((this.$refs.Xhosa).color === 'green') {
        (this.$refs.Xhosa).color = 'lightGrey';
        (this.$refs.Xhosa).textColor = 'black'
      } else {
        (this.$refs.Xhosa).color = 'green';
        (this.$refs.Xhosa).textColor = 'white'
      }
    },
    Tshwana () {
      if ((this.$refs.Tshwana).color === 'green') {
        (this.$refs.Tshwana).color = 'lightGrey';
        (this.$refs.Tshwana).textColor = 'black'
      } else {
        (this.$refs.Tshwana).color = 'green';
        (this.$refs.Tshwana).textColor = 'white'
      }
    }
  }
}
</script>
