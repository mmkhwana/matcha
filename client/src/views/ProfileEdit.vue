<template>

  <v-card
    class="mx-auto my-12"
  >
     <v-container id="dropdown-example-2">
       <v-row>
          <v-col cols="2"
          class="d-flex child-flex"
          color="deep-purple lighten-3"
        dark
          >
              <v-container class="text-center">
                <template>
                    <v-dialog
      v-model="dialog"
      persistent
      max-width="490px"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-camera-plus</v-icon>
        </v-btn>
        <v-card-text>Upload Photo</v-card-text>
      </template>
      <v-card>
        <v-card-title class="headline">Choose Photo</v-card-title>
      <v-card-text>
                <v-img
                  :src="`https://picsum.photos/500/300?image=${1 * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${1 * 5 + 10}`"
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text align-end grey lighten-2"
                >
                </v-img>
      </v-card-text>
        <v-card-text>
          <input
              accept="image/*"
              color="primary"
              type="file"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="purple darken-1"
            text
            v-on:click.native="dialog = false"
          >
            cancel
          </v-btn>

          <v-btn
            color="purple darken-1"
            text
            v-on:click.stop="dialog = false"
          >
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
                </template>
              </v-container>
            </v-col>
            <v-col
              v-for="n in 5"
              :key="n"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card>
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1.5"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  class="white--text  lighten-2"
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
                label="Bio"
                value="Bio(optional)."
                ></v-textarea>
              </v-card-subtitle>
              <v-card-text>
                <v-row
                    v-for="n in 5"
                    :key="n"
                    class="d-flex child-flex"
                    cols="4"
                >
                    <v-col cols="3">
                        <v-card-text>Relationship:</v-card-text>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                      label="Your status"
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
        v-model="selection"
        column
      >
        <v-chip @click="Zulu" ref="Zulu">isiZulu</v-chip>

        <v-chip @click="English" ref="English">English</v-chip>

        <v-chip @click="Afrikaans" ref="Afrikaans">Afrikaans</v-chip>

        <v-chip @click="Xhosa" ref="Xhosa">isiXhosa</v-chip>

        <v-chip @click="Tshwana" ref="Tshwana">Tshwana</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Interest</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        column
      >

        <v-chip @click="Going_out" ref="out">Going out</v-chip>

        <v-chip @click="Drinking" ref="Drink">Drinking</v-chip>

        <v-chip @click="Smoking" ref="Smoking">Smoking</v-chip>

        <v-chip @click="Tattoos" ref="Tattoos">Tattoos</v-chip>

        <v-chip @click="Some" ref="Some">Some Nice honeys</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'Profile Edit',
  default () {
    return {
      dialog: true
    }
  },
  async close () {
    this.dialog = null
  },
  methods: {
    Going_out () {
      if ((this.$refs.out).color === 'green') {
        (this.$refs.out).color = 'lightGrey';
        (this.$refs.out).textColor = 'black'
      } else {
        (this.$refs.out).color = 'green';
        (this.$refs.out).textColor = 'white'
      }
    },
    Drinking () {
      if ((this.$refs.Drink).color === 'green') {
        (this.$refs.Drink).color = 'LightGrey';
        (this.$refs.Drink).textColor = 'black'
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
