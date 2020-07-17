<template>
<v-row
    align="center"
    justify="center"
>
<v-flex
    align="center"
    justify="center"
    class="images-flex"
>
<v-col
    v-for="(n, position) in pictures"
    :key="position"
    cols="2"
    sm="3"
    class="images-flex"
>
<v-hover v-slot:default="{ hover }">
    <v-card :class="{ 'on-hover': hover }" min-width="200px">
    <v-img
    :src='`http://localhost:5000/api/posts/uploads/${username}/${n.name}`'
    :lazy-src='`http://localhost:5000/api/posts/uploads/${username}/${n.name}`'
    aspect-ratio='1.0'
    elevation="8"
    gradient='to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)'
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
    <div class="align-self-center fill-width">
        <v-btn
        v-for="(icon, index) in icons"
        :key="index"
        :class="index === 2 ? { 'show-dele-btns': hover } : index === 0 ? { 'show-set-btns': hover } : { 'show-btns': hover }"
        color="transparent"
        v-on:click="index=== 2 ? removePicture (n.name, position) : index === 0 ? setProfile (n.name, position) : previewImage(n.name)"
        icon
        >
        <v-icon
            :class="index === 2 ? { 'show-dele-btns': hover } : index === 0 ? { 'show-set-btns': hover } : { 'show-btns': hover }"
            color="transparent"
        >
            {{ icon }}
        </v-icon>
        </v-btn>
    </div>
    </v-img>
    </v-card>
</v-hover>
</v-col>
</v-flex>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="600px">
        <v-card class="preview-image">
        <v-img
            :src = image
        >
        </v-img>
        </v-card>
    </v-dialog>
  </v-row>
</v-row>
</template>
<style scoped src="../assets/css/profile.css" lang="css">
</style>
<script>
import gallery from '../scripts/gallery-component'
export default gallery
</script>
