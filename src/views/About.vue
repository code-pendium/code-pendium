<template>
  <v-container fluid>
    <v-row justify="center">

      <v-col cols="12">
        <v-row justify="center">
          <span class="display-2 font-weight-thin">About</span>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12">
        <v-row justify="center">
        <span class="body-1 text-center">
          Made with <v-icon color="teal">mdi-vuejs</v-icon> VueJS and <v-icon color="light-blue">mdi-vuetify</v-icon> Vuetify.
          This work was made in compliance to a research study by AMA CC Davao Students.
          <br/>
          This work is also open-sourced, and is open for contribution. 
          For more details, visit this site's repository on the link below.
        </span>
        </v-row>
        <br>
        <v-row justify="center">
          <v-btn tile outlined href="https://github.com/code-pendium/code-pendium" target="_blank">
            <v-icon left>mdi-github-circle</v-icon>
            Repository
          </v-btn>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12">
        <v-row justify="center">
          <span class="title font-weight-light mb-2">Contributors</span>
        </v-row>
        <v-row justify="center">
          <v-col 
            cols="4"
            v-bind:key="contributor.username"
            v-for="contributor in contributors"
          >
            <v-card class="mb-2" ripple>
              <v-card-title>
                <span>{{contributor.name}}</span>
                <v-spacer></v-spacer>
                <v-avatar size="48" tile>
                  <v-img contain :src="contributor.avatar"/>
                </v-avatar>
              </v-card-title>
              <v-card-subtitle>
                <span>
                  @{{contributor.username}}
                  <v-btn icon :href="`https://github.com/${contributor.username}`" target="_blank">
                    <v-icon>mdi-github-circle</v-icon>
                  </v-btn>
                </span>
              </v-card-subtitle>
              <v-divider></v-divider>
              <v-card-actions>
                <v-chip
                  class="mr-1"
                  v-bind:key="`${contributor.username}-${tag}`"
                  v-for="tag in contributor.tags"
                >
                  {{tag}}
                </v-chip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        
      </v-col>

      <v-col cols="12">
        <v-row justify="center">
          <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/" target="_blank">
            <img alt="Creative Commons License" style="border-width:0" src="@/assets/cc/by-nc-4.0.png" />
          </a>
        </v-row>
        <v-row justify="center">
          <span class="caption">
            This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.
          </span>
        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    contributors: [
      {
        name: "Kervy Caranto",
        username: "QuazzyWazzy",
        avatar: require("@/assets/avatars/avatar1.png"),
        tags: ["Researcher", "Programmer", "Web Design"]
      },
      {
        name: "Paul Tolentino",
        username: "1NV1D14",
        avatar: require("@/assets/avatars/avatar2.png"),
        tags: ["Researcher", "Writer", "Printer"]
      },
    ]
  })
}
</script>