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
    <v-row>
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
    aspect-ratio='1.5'
    gradient='to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
    class='white--text align-end grey lighten-2'
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
    <v-card-title>Personal Info.</v-card-title>
    <v-card-subtitle>{{ biography }}</v-card-subtitle>
    <v-card-text>
    <v-row
    v-for="n in personality"
    :key="n.name"
    class="d-flex child-flex"
    cols="4"
    >
    <v-col cols="3">
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
    <v-chip-group
    v-model="selection"
    active-class="deep-purple accent-4 white--text"
    column
    >
    <v-chip>isiZulu</v-chip>

    <v-chip>English</v-chip>

    <v-chip>Afrikaans</v-chip>

    <v-chip>isiXhosa</v-chip>

    <v-chip>Tshwana</v-chip>
    </v-chip-group>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Interests</v-card-title>

    <v-card-text>
    <v-chip-group
    v-model="selection"
    active-class="deep-purple accent-4 white--text"
    column
    >
    <v-chip >Going out</v-chip>

    <v-chip >Drinking</v-chip>

    <v-chip >Smoking</v-chip>

    <v-chip >Tattoos</v-chip>

    <v-chip >Some Nice honeys</v-chip>
    </v-chip-group>
    </v-card-text>

    <v-card-actions>
    </v-card-actions>
    </v-card>
</template>
<script>
import UserProfileService from '../UserProfileService'

export default {
  name: 'Edit',
  data: () => {
    return {
      pictures: [],
      biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      personality: [{ name: 'Relationship', value: 'Complicated' }, { name: 'Height', value: '1.5m' }, { name: 'Age', value: '25yrs' }, { name: 'Race', value: 'Black' }, { name: 'Hair', value: 'Curled' }]
    }
  },
  async mounted () {
    const pics = await UserProfileService.readImages()
    this.pictures = pics.data
    alert(this.pictures)
  },
  methods: {
    edit () {
      this.$root.$emit('Edit')
    }
  }
}
</script>
