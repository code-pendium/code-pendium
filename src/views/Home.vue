<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-img src="../assets/logo.png" max-height="100" max-width="100" @load="imgLoaded = true">
            <v-skeleton-loader v-if="!imgLoaded" type="image">
            </v-skeleton-loader>
          </v-img>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <span>
            <span class="display-3 font-weight-thin">
              <vue-typer 
              text="Codependium" 
              :repeat="0"
              :typeDelay="100"
              ></vue-typer>
            </span> 
            <span class="title font-weight-thin">
              v{{this.$store.state.version}}
            </span>
          </span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <span class="title font-weight-light">
            A compendium of educational coding puzzles and problems for cognitive skill development
          </span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      imgLoaded: false
    })
  }
</script>