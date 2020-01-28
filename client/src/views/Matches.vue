<template>
<<<<<<< HEAD
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="n in 9"
              :key="n"
              cols="5"
=======
        <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="n in 9"
              :key="n"
              class="d-flex child-flex"
              cols="4"
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
            >
              <v-card>
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
<<<<<<< HEAD
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
=======
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
                  <v-card-title class="title">Khanyisa Mbukutshe</v-card-title>
                   <v-card-subtitle>Happy Man</v-card-subtitle>
                </v-img>
                 <v-card-actions>
        <v-rating
          :value="2.5"
          dense
          half-increments
          readonly
          size="14"
          background-color="purple lighten-3"
          color="purple"
        ></v-rating>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-chat</v-icon>
              </v-btn>
                 </v-card-actions>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
              </v-card>
            </v-col>
          </v-row>
        </v-container>
<<<<<<< HEAD
=======
        </v-card>
>>>>>>> 3a8940fe04bdd06136e1d21fda12a8c2607afbae
</template>
