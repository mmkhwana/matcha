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
    <v-row
    align="center"
    justify="center"
    >
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
<script>
import UserProfileService from '../UserProfileService'
import Table from '../tables'
import Constant from '../constants'

export default {
  name: 'Edit',
  data: () => {
    return {
      pictures: [],
      biography: '',
      languages: [],
      interests: [],
      personality: [
        { name: Constant.relationship, value: '' },
        { name: Constant.height, value: '' },
        { name: Constant.age, value: '' },
        { name: Constant.race, value: '' },
        { name: Constant.hair, value: '' }
      ]
    }
  },
  async mounted () {
    const pics = await UserProfileService.readImages()
    this.pictures = pics.data
    const res = (await UserProfileService.getUserDetails(1))[0]
    let output = await UserProfileService.getInterest(1)
    let lang = await UserProfileService.getLanguage(1)
    this.biography = res[Table.User.biography]
    this.personality[0].value = res[Table.User.status]
    this.personality[1].value = res[Table.User.height] + 'm'
    this.personality[2].value = res[Table.User.age] + 'yrs'
    this.personality[3].value = res[Table.User.race]
    this.personality[4].value = res[Table.User.hair]
    lang.forEach(lang => {
      this.languages.push(lang[Table.Languages.name])
    })
    output.forEach(interest => {
      this.interests.push(interest[Table.Interests.name])
    })
  },
  methods:
  {
    edit () {
      this.$root.$emit('Edit')
    }
  }
}
</script>
