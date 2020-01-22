<template>
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="n in 9"
              :key="n"
              cols="5"
            >
              <v-card>
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title >Khanyisa Mbukutshe</v-card-title>
                  <v-card-subtitle>Happy Man</v-card-subtitle>
                </v-img>
                            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
              </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
</template>
