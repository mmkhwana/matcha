<template>
<v-card
>
<v-container id="dropdown-example-2">
<v-row>
    <v-col cols="12" class="text-right">
        <v-btn icon @click="edit">
            <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
    </v-col>
</v-row>
<v-row>
<v-col
v-for="n in 5"
:key="n"
class="d-flex child-flex"
cols="2"
>
<v-card>
<v-img
:src='`https://picsum.photos/500/300?image=${n * 5 + 10}`'
:lazy-src='`https://picsum.photos/10/6?image=${n * 5 + 10}`'
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
<v-card-title>Biography</v-card-title>
<v-card-subtitle>ghjvjxvjzvcjchZVjchv</v-card-subtitle>
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
<v-card-text>Complicated</v-card-text>
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
import {
  mdiAccount,
  mdiShareVariant,
  mdiDelete
} from '@mdi/js'
export default {
  name: 'Edit',
  data: () => ({
    icons: {
      mdiAccount,
      mdiShareVariant,
      mdiDelete
    }
  }),
  methods: {
    edit () {
      this.$root.$emit('Edit')
    }
  }
}
</script>
