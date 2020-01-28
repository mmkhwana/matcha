<template>
  <v-card
  >
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
      <v-col cols="12">
          <v-card flat>
              <v-card-text>
                <v-row
                    v-for="n in settings"
                    v-bind:key="n"
                    class="d-flex child-flex"
                    cols="4"
                >
                    <v-col cols="3">
                        <v-card-text>{{ n.title }}</v-card-text>
                    </v-col>
                    <v-col cols="6">
                        <v-card-text>{{ n.value }}</v-card-text>
                    </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                  <a href ="#">Change Password</a>
                  </v-card-actions>
          </v-card>
      </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
  </v-card>
</template>
<script>
export default {
  default () {
    return {
      settings: [
        { title: 'Name', value: 'Khanyisa' }
      ]
    }
  }
}
</script>