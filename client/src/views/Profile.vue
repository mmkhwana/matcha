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
    class="d-flex flex-row mb-6"
    >
    <v-col
    v-for="n in pictures"
    :key="n"
    class="d-flex flex-column mb-6"
    cols="4"
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
import profile from '../scripts/profile_component'
export default profile
</script>
